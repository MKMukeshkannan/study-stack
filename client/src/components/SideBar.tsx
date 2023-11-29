import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconSettings,
  IconHome,
  IconFilePlus,
  IconReload,
  IconX,
} from "@tabler/icons-react";
import IconText from "./IconText";
import { useSideBarContext } from "@/context/SideBarContext";

export default function SideBar() {
  const { isOpen, setIsOpen } = useSideBarContext();

  return (
    <aside
      className={`fixed  lg:static duration-1000 ease-in-out transition-all ${
        isOpen ? "left-0" : "left-[-1000px]"
      } top-0 w-full max-w-xs h-screen p-5 bg-white z-[999] border-r-slate-200 border`}
    >
      <section
        onClick={() => {
          setIsOpen(false);
        }}
        className="absolute top-5 right-5 lg:hidden"
      >
        <IconX />
      </section>
      <section className="h-full  flex flex-col items-center ">
        <section className="pt-5 flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold">Mukesh Kannan</h1>
          <p className="text-xs font-mono">Lvl. 1</p>
        </section>

        <section className="pt-24 flex flex-col justify-center space-y-4">
          <IconText text="Home" icon={<IconHome />} />
          <IconText text="Add New" icon={<IconFilePlus />} />
          <IconText text="Revise" icon={<IconReload />} />
          <IconText text="settings" icon={<IconSettings />} />
        </section>
      </section>
    </aside>
  );
}
