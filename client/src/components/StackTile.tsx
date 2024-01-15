import { cn } from "@/lib/utils";
import { stack } from "@/pages/Home";
import { IconSchool } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

interface props {
  stack: stack;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setViewStack: Dispatch<SetStateAction<stack | null>>;
}

export default function StackTile(
  { stack, setOpen, setViewStack }: props,
) {
  const date = new Date(stack.last_revised);
  const formatedDate = date.getFullYear() === 2000
    ? "New Stack"
    : `${date.getUTCDate()}-${date.getMonth()}-${date.getFullYear()}`;

  return (
    <section
      className={cn(
        "h-64 w-full max-w-[250px] cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center flex-shrink relative",
        `grayscale hover:grayscale-0 bg-[url(https://wallpapers.com/images/hd/abstract-background-05pes2pdd70ar3ki.jpg)] bg-cover`,
      )}
      onClick={() => {
        setOpen(true);
        setViewStack(stack);
      }}
    >
      <h1 className="text-3xl font-bold text-white">{stack.stack_name}</h1>
      <h1 className="text-xl font-thin text-white">{formatedDate}</h1>
      <h1 className="absolute text-white right-5 bottom-5 flex items-center justify-center gap-1">
        <span>
          <IconSchool size={19} />
        </span>
        {stack.confidence}%
      </h1>
    </section>
  );
}
