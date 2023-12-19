import AddNewQuestionButton from "@/components/AddNewQuestionButton";
import AddQuestionSidebar from "@/components/AddQuestionSidebar";
import QuestionTile from "@/components/QuestionTile";
import { Input } from "@/components/ui/input";
import AddQuestionContextProvider from "@/context/AddQuestionContextProvider";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AddNew() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <AddQuestionContextProvider>
        <section className="flex h-0 flex-auto flex-row p-5">
          <section
            className={cn(
              "bg-white rounded-xl p-7 shadow relative overflow-y-auto w-full",
              isOpen && "hidden lg:block lg:mr-5",
            )}
          >
            <Input
              placeholder="Stack Name !!"
              className="border-0 rounded-none text-6xl font-medium min-w-fit w-1/3 py-8 border-dashed border-b-[5px] border-b-slate-400  "
            />
            <section
              className={cn(
                "w-44 h-56 bg-red-400 rounded-xl mt-5 mx-auto lg:absolute lg:top-8 lg:right-8 ",
                isOpen && "opacity-0",
              )}
            />

            <QuestionTile setOpen={setOpen} />

            <AddNewQuestionButton setOpen={setOpen} />
          </section>

          <AddQuestionSidebar
            isOpen={isOpen}
            setOpen={setOpen}
          />
        </section>
      </AddQuestionContextProvider>
    </>
  );
}
