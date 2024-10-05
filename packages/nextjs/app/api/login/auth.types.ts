import { SessionOptions } from "iron-session";

export interface SessionData {
  isLoggedIn: boolean;
  user?: {

    id?: number;
    name?: string;
    email?: string;
    createdAt?: Date
  };
}

export const defaultSession: any = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: "eth-rome24",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
