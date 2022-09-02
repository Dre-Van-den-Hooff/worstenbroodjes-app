import { ReactNode } from "react";

export interface LoginValues {
  username: string;
  password: string;
}

export interface RegisterValues {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface PageProps {
  children: ReactNode;
}
