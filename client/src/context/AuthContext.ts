import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface User {
  name: string;
  email: string;
  accesstoken: string;
}

export interface AuthState {
  auth: User;
  setAuth: Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<AuthState | undefined>(
  undefined,
);

export function useAuthContext() {
  const state = useContext(AuthContext);

  if (state === undefined) {
    throw new Error("useAuthContext got a undefined value");
  }

  return { auth: state.auth, setAuth: state.setAuth };
}
