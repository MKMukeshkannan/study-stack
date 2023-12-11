import { useSideBarContext } from "@/context/SideBarContext";
import { SearchInput } from "./SearchInput";
import { IconMenu2 } from "@tabler/icons-react";

export default function NavBar() {
  const { setIsOpen } = useSideBarContext();

  return (
    <nav className="drop-shadow p-5 bg-white z-[9999]">
      <section className="flex flex-row justify-between">
        <h1 className="flex items-center text-3xl lg:text-4xl font-extrabold ">
          <IconMenu2
            onClick={() => setIsOpen(true)}
            className="lg:hidden w-10 h-10 mr-2"
          />
          STUDY STACK
        </h1>
        <SearchInput />
      </section>
    </nav>
  );
}
