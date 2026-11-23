
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { badRequest, notFound } from '../utils/http-error.js';

const SAFE_KEY = /^[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_.-]+)*$/;

export class LocalDiskStorage {
  constructor({ dir, publicBaseUrl }) {
    this.root = path.resolve(dir);
    this.publicBaseUrl = publicBaseUrl.replace(/\/+$/, '');
  }

  #pathFor(key) {
    if (
      typeof key !== 'string' ||
      !SAFE_KEY.test(key) ||
      key.split('/').some((part) => part === '.' || part === '..')
    ) {
      throw badRequest('Invalid storage key');
    }

    const full = path.resolve(this.root, key);
    const relative = path.relative(this.root, full);

    if (
      relative === '' ||
      relative.startsWith('..' + path.sep) ||
      relative === '..' ||
      path.isAbsolute(relative)
    ) {
      throw badRequest('Invalid storage key');
    }

    return full;
  }

  async put(key, buffer) {
    const file = this.#pathFor(key);

    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, buffer);

    return this.urlFor(key);
  }

  async get(key) {
    try {
      return await readFile(this.#pathFor(key));
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw notFound('Uploaded file not found');
      }
      throw err;
    }
  }

  async delete(key) {
    await rm(this.#pathFor(key), { force: true });
  }

  urlFor(key) {
    this.#pathFor(key);
    return `${this.publicBaseUrl}/uploads/${key}`;
  }

  async createPresignedUpload() {
    throw notFound('Direct uploads require STORAGE_DRIVER=s3');
  }
}
