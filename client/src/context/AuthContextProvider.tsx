import { ReactNode, useState } from "react";
import { AuthContext, User } from "./AuthContext";

interface props {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: props) {
  const [auth, setAuth] = useState<User | null>(null);
  const [persist, setPersist] = useState<string>(
    JSON.parse(localStorage.getItem("persist") || "false"),
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
}
