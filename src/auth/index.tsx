import { createContext, useEffect, useState, useMemo, useCallback, useContext } from "react";
import { AuthProps, LoggedInUser, User } from "../interfaces";
import { GET_USER_BY_ID } from "../api/user";
import { useLazyQuery } from "@apollo/client";
import { Buffer } from "buffer";

const AuthContext = createContext<LoggedInUser>({} as LoggedInUser);

const useAuth = () => useContext(AuthContext);

const parseJwt = (token: string | null) => {
  if (!token) return {};
  const base64Url = token.split(".")[1];
  const payload = Buffer.from(base64Url, "base64");
  const jsonPayload = payload.toString("ascii");
  return JSON.parse(jsonPayload);
};

const parseExp = (exp: number | string) => {
  if (!exp) return null;
  if (typeof exp !== "number") exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
};

export const useSession = () => {
  const { token, user, ready } = useAuth();
  return { token, user, ready, isAuthed: Boolean(token) };
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
  const [ready, setReady] = useState<boolean>(false);

  const [getUserById] = useLazyQuery(GET_USER_BY_ID, {
    onCompleted: data => {
      setUser(data.getById);
    },
    onError(error) {
      console.log(error);
    },
  });

  const setSession = useCallback(
    async (token: string | null, user: User | null) => {
      const { exp, userId } = parseJwt(token);
      const expiry = parseExp(exp);
      //@ts-ignore
      const stillValid = expiry >= new Date();
      if (stillValid) {
        //@ts-ignore
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
        token = null;
      }

      setToken(token);
      setReady(Boolean(token && stillValid));

      if (!user && stillValid) {
        getUserById({ variables: { id: userId } });
      }
      setUser(user);
    },
    [getUserById]
  );

  const loginUser = useCallback(
    async (user: User, token: string) => {
      await setSession(token, user);
    },
    [setSession]
  );

  const logoutUser = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setSession(token, null);
  }, [token, setSession]);

  //TODO: Fix typing
  const value: any = useMemo(
    () => ({
      token,
      user,
      ready,
      loginUser,
      logoutUser,
    }),
    [token, user, ready, loginUser, logoutUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
