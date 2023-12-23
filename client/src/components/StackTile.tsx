import { stack } from "@/pages/Home";
import { Dispatch, SetStateAction } from "react";

interface props {
  stack_id: number;
  stack_name: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setViewStack: Dispatch<SetStateAction<stack | null>>;
}

export default function StackTile(
  { stack_name, stack_id, setOpen, setViewStack }: props,
) {
  return (
    <section
      className="h-64 w-full max-w-[250px] cursor-pointer rounded-xl p-3 flex items-center justify-center flex-shrink bg-blue-400"
      onClick={() => {
        setOpen(true);
        setViewStack({ stack_name: stack_name, stack_id: stack_id });
      }}
    >
      <h1 className="text-3xl font-bold text-white">{stack_name}</h1>
    </section>
  );
}
