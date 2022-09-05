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

export interface LoggedInUser {
  user: User;
  token: string;
  ready: boolean;
  loginUser: (user: User, token: string) => void;
  logoutUser: () => void;
}

export interface LeaderboardRowProps {
  id: string;
  username: string;
  amount: number;
  rank: number;
}

interface Stats {
  totalSpent: number;
  lastPurchase: string;
  worstenbroodjes: number;
  pizzas: number;
  muffins: number;
  paninis: number;
}

export interface FoodDrawerProps {
  //TODO: find correct type
  btnRef: any;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface AuthProps {
  children: ReactNode;
}
