import { cn } from "@/lib/utils";
import {
  IconArrowsDiagonal2,
  IconArrowsDiagonalMinimize,
  IconMarkdown,
  IconX,
} from "@tabler/icons-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionsPostValidator, QuestionType } from "@/lib/validators";
import { useAddQuestionHook } from "@/context/AddQuestionContext";
import { Toggle } from "./ui/toggle";

interface props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isMax: boolean;
  setMax: Dispatch<SetStateAction<boolean>>;
}

const AddQuestion = ({ isOpen, setOpen, isMax, setMax }: props) => {
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
    getValues,
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

  const [isMarkDown, setMarkDown] = useState<boolean>(false);

  return (
    <section
      className={cn(
        "relative bg-white h-full w-full min-w-[200px] rounded-xl p-7 shadow transition-all duration-500",
        !isOpen && "hidden",
      )}
    >
      <section
        onClick={() => {
          setOpen(false);
          setMax(false);
        }}
        className="absolute top-5 right-5 cursor-pointer"
      >
        <IconX />
      </section>
      <section
        onClick={() => {
          setMax((prev) => !prev);
        }}
        className="absolute hidden md:inline-block top-5 right-12 cursor-pointer"
      >
        {isMax ? <IconArrowsDiagonalMinimize /> : <IconArrowsDiagonal2 />}
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
            "flex-1 text-md font-mono",
            errors.question && "border-4 border-dashed border-red-500",
          )}
        />
        <section className="relative h-0 flex-[3] ">
          {!isMarkDown
            ? (
              <Textarea
                {...register("answer")}
                placeholder="Answer"
                className={cn(
                  "h-full text-md font-mono",
                  errors.answer && "border-4 border-dashed border-red-500",
                )}
              >
              </Textarea>
            )
            : (
              <ReactMarkdown
                children={getValues("answer") ||
                  "**Change Markdown mode to edit**"}
                className="p-3 border-slate-200 border w-full h-full overflow-y-auto rounded-md"
              >
              </ReactMarkdown>
            )}
          <Toggle
            className="h-10 w-10 absolute right-0 top-0 m-2"
            aria-label="Toggle markdown"
            onPressedChange={(e) => setMarkDown(e.valueOf())}
          >
            <IconMarkdown />
          </Toggle>
        </section>
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
