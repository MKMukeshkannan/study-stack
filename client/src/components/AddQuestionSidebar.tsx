import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionsPostValidator, QuestionType } from "@/lib/validators";
import { useAddQuestionHook } from "@/context/AddQuestionContext";

interface props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddQuestion = ({ isOpen, setOpen }: props) => {
  const { question, setQuestion, formVal, nextId, setFormVal } =
    useAddQuestionHook();

  useEffect(() => {
    if (formVal) {
      setValue("question", formVal.question);
      setValue("answer", formVal.answer);
    } else {
      setValue("question", "");
      setValue("answer", "");
    }
  }, [formVal]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<QuestionType>({
    resolver: zodResolver(questionsPostValidator.omit({ question_id: true })),
  });

  const onSubmit = (data: QuestionType) => {
    const newData = { ...data, question_id: nextId.current };
    setQuestion([...question, newData]);
    nextId.current += 1;
    setFormVal(null);
    reset();
  };

  const saveQuestion = (data: QuestionType) => {
    const newData: QuestionType[] = [];
    for (let i = 0; i < question.length; i++) {
      if (question[i].question_id === formVal?.question_id) {
        newData.push({
          question: data.question,
          answer: data.answer,
          question_id: formVal?.question_id,
        });
      } else {
        newData.push(question[i]);
      }
    }
    setQuestion(newData);
  };

  return (
    <section
      className={cn(
        "relative bg-white h-full min-w-[400px] rounded-xl p-7 shadow transition-all duration-500",
        !isOpen && "hidden",
      )}
    >
      <section
        onClick={() => {
          setOpen(false);
        }}
        className="absolute top-5 right-5 cursor-pointer"
      >
        <IconX />
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full w-full gap-5"
      >
        <h1 className="text-3xl text-center font-medium">Add Question</h1>
        <Textarea
          {...register("question")}
          placeholder="Question"
          className={cn(
            "flex-1 text-xl",
            errors.question && "border-4 border-dashed border-red-500",
          )}
        />
        <Textarea
          {...register("answer")}
          placeholder="Answer"
          className={cn(
            "flex-[3] text-xl",
            errors.answer && "border-4 border-dashed border-red-500",
          )}
        />
        {formVal
          ? (
            <>
              <section className="flex flex-row space-x-3">
                <Button
                  onClick={handleSubmit(saveQuestion)}
                  className="py-8 w-full"
                >
                  Save
                </Button>
                <Button type="submit" name="add" className="py-8 w-full">
                  Add New
                </Button>
              </section>
            </>
          )
          : (
            <Button
              disabled={isSubmitting}
              type="submit"
              name="add"
              className="py-8 w-full"
            >
              Add
            </Button>
          )}
      </form>
    </section>
  );
};

export default AddQuestion;
