import { useAddQuestionHook } from "@/context/AddQuestionContext";
import { IconPlus } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

const AddNewQuestionButton = (
  { setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> },
) => {
  const { setFormVal } = useAddQuestionHook();

  return (
    <section className="max-w-[700px] w-full border-4 border-dashed border-slate-400 h-36 rounded-xl mt-5 flex justify-center">
      <section
        onClick={() => {
          setOpen(true);
          setFormVal(null);
        }}
        className="flex flex-col items-center justify-center cursor-pointer hover:text-black"
      >
        <IconPlus className="border-4 rounded-full text-slate-400 w-14 border-slate-400 h-14" />
        <h1 className="text-xl font-medium text-slate-400 ">
          Add Questions
        </h1>
      </section>
    </section>
  );
};

export default AddNewQuestionButton;
