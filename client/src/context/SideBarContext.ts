import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface SideBarState {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SideBarContext = createContext<SideBarState | undefined>(
  undefined,
);

export function useSideBarContext() {
  const state = useContext(SideBarContext);

  if (state === undefined)
    throw new Error("useSideBarContext got a undefined value");

  return { isOpen: state.isOpen, setIsOpen: state.setIsOpen };
}
