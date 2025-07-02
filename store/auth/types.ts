import { User } from "../../types/user";

export interface AuthSession {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
