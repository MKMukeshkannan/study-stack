import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconFilePlus,
  IconHome,
  IconLogout,
  IconReload,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import IconText from "./IconText";
import { useSideBarContext } from "@/context/SideBarContext";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";

export default function SideBar() {
  const { isOpen, setIsOpen } = useSideBarContext();
  const navigate = useNavigate();
  const logoutCall = useLogout();

  const logout = async () => {
    await logoutCall();
    navigate("/login");
  };

  return (
    <aside
      className={`fixed lg:static duration-1000 ease-in-out transition-all ${
        isOpen ? "left-0" : "left-[-1000px]"
      } top-0 w-full max-w-xs p-5 bg-white z-[999] min-h-screen border-r-slate-200 border flex flex-col items-center`}
    >
      <section
        onClick={() => {
          setIsOpen(false);
        }}
        className="absolute top-5 right-5 lg:hidden"
      >
        <IconX />
      </section>
      <section className=" flex flex-col items-center justify-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link to="/me" className="text-xl font-bold">Mukesh Kannan</Link>
        <p className="text-xs font-mono">Lvl. 1</p>
      </section>

      <section className="flex flex-col flex-1 mb-24 justify-center space-y-4">
        <IconText text="Home" icon={<IconHome />} link="/" />
        <IconText text="Add New" icon={<IconFilePlus />} link="add-new" />
        <IconText text="Revise" icon={<IconReload />} link="/revise" />
        <IconText text="Settings" icon={<IconSettings />} link="/settings" />
      </section>
      <h1
        onClick={logout}
        className="text-2xl font-bold flex items-center cursor-pointer"
      >
        <span className="pr-2">
          <IconLogout />
        </span>
        Logout
      </h1>
    </aside>
  );
}
