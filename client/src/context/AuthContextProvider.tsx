import { ReactNode, useState } from "react";
import { AuthContext, User } from "./AuthContext";

interface props {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: props) {
  const [auth, setAuth] = useState<User>({
    name: "",
    email: "",
    accesstoken: "",
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
