import { ReactNode, useState } from "react";
import { SideBarContext } from "./SideBarContext";

interface props {
  children: ReactNode;
}

export default function SideBarContextProvider({ children }: props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SideBarContext.Provider>
  );
}
