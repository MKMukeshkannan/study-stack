import AddNewQuestionButton from "@/components/AddNewQuestionButton";
import AddQuestionSidebar from "@/components/AddQuestionSidebar";
import QuestionTile from "@/components/QuestionTile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddQuestionHook } from "@/context/AddQuestionContext";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { cn } from "@/lib/utils";
import { QuestionPostType, questionPostValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddNew() {
  const [isOpen, setOpen] = useState<boolean>(false);

  const { register, setValue, handleSubmit, formState: { errors }, reset } =
    useForm<
      QuestionPostType
    >({
      resolver: zodResolver(questionPostValidator),
    });

  const { nextId, question, setQuestion, setFormVal } = useAddQuestionHook();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setValue("data", question);
  }, [question]);

  const onSubmit = async (data: QuestionPostType) => {
    try {
      await axiosPrivate.post("/api/v1/stack/create-stack", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      reset();
      setQuestion([]);
      setFormVal(null);
      nextId.current = 1;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section className="flex h-0 flex-auto flex-row p-5">
        <section
          className={cn(
            "bg-white rounded-xl p-7 shadow relative overflow-y-auto w-full",
            isOpen && "hidden lg:block lg:mr-5",
          )}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Stack Name !!"
              className={cn(
                "border-0 rounded-none text-6xl font-medium min-w-fit w-1/3 py-8 border-dashed border-b-[5px]",
                errors.stack_name ? "border-b-red-400" : "border-b-slate-400  ",
              )}
              {...register("stack_name")}
            />
            <section
              className={cn(
                "w-44 h-56 bg-red-400 rounded-xl mt-5 mx-auto lg:absolute lg:top-8 lg:right-8 ",
                isOpen && "opacity-0",
              )}
            />

            <QuestionTile setOpen={setOpen} />

            {errors.data && (
              <p className="font-bold text-xl text-red-400 pt-8">
                {errors.data.message}
              </p>
            )}
            <AddNewQuestionButton setOpen={setOpen} />

            <Button
              className="mt-8 w-full py-8 px-20 font-bold text-xl md:w-auto"
              type="submit"
            >
              Create
            </Button>
          </form>
        </section>

        <AddQuestionSidebar
          isOpen={isOpen}
          setOpen={setOpen}
        />
      </section>
    </>
  );
}
