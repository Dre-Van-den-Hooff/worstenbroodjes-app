import { ReactNode } from "react";

export interface LoginValues {
  username?: string;
  password?: string;
}

export interface RegisterValues {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface PageProps {
  children: ReactNode;
  withFooter?: boolean;
}

export interface User {
  id: string;
  username: string;
  stats: Stats;
}

export interface LeaderboardRowProps {
  id: string;
  username: string;
  stats: Stats;
}

interface Stats {
  totalSpent: number;
  lastPurchase: string;
  worstenbroodjes: number;
  pizzas: number;
  muffins: number;
  paninis: number;
}
