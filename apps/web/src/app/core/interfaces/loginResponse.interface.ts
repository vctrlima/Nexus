import { User } from "./user.interface";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
