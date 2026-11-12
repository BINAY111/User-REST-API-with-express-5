import { z } from "zod";
import { ROLES } from "../services/users.service.js";
import { email, password } from "./user.schema.js";

// Login validation
export const loginSchema = z.strictObject({
  email,
  // Login only checks that password is a string.
  // It does not apply registration password-strength rules.
  password: z.string().max(72),
});

// Change password validation
export const changePasswordSchema = z.strictObject({
  currentPassword: z.string().max(72),
  newPassword: password,
});

// Change user role validation
export const changeRoleSchema = z.strictObject({
  role: z.string().refine(
    (value) => ROLES.includes(value),
    "must be a valid role"
  ),
});