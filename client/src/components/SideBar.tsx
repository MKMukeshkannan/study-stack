import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconSettings,
  IconHome,
  IconFilePlus,
  IconReload,
} from "@tabler/icons-react";
import IconText from "./IconText";

export default function SideBar() {
  return (
    <aside className="static top-0 left-0 w-full max-w-xs h-screen p-5 bg-blue-200">
      <section className="h-full  flex flex-col items-center ">
        <h1 className="pt-5 text-4xl text-center font-extrabold">
          STUDY STACK
        </h1>

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
