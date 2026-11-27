import { sleep } from './async-utils.js';

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const { add } = require('./legacy.cjs');

console.log('start');

console.log('Addition:', add(5, 3));

await sleep(100);


console.log('done after 100ms');