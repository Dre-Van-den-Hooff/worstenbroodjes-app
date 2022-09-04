import { createContext, useEffect, useState, useMemo, useCallback, useContext } from "react";
import { AuthProps, LoggedInUser, User } from "../interfaces";

const AuthContext = createContext<LoggedInUser>({} as LoggedInUser);

const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const { token, user } = useAuth();
  return { token, user, isAuthed: Boolean(token) };
};

export const useLogin = () => {
  const { loginUser } = useAuth();
  return loginUser;
};

export const useLogout = () => {
  const { logoutUser } = useAuth();
  return logoutUser;
};

const AuthProvider = ({ children }: AuthProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>();

  const loginUser = useCallback((user: User, token: string) => {
    setToken(token);
    setUser(user);
  }, []);

  const logoutUser = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token, user]);

  //TODO: Fix typing
  const value: any = useMemo(
    () => ({
      token,
      user,
      loginUser,
      logoutUser,
    }),
    [token, user, loginUser, logoutUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
