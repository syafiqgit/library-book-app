import {
  loginSchema,
  registerSchema,
  LoginSchema,
  RegisterSchema,
} from "./types";

import { loginAccount, registerAccount } from "./api";

export type { LoginSchema, RegisterSchema };
export { loginAccount, registerAccount, loginSchema, registerSchema };
