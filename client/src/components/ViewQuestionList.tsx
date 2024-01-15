import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { QuestionType } from "@/lib/validators";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface props {
  stack_name: string;
  stack_id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ViewQuestionList = ({ stack_id, stack_name, setOpen }: props) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [expanded, setExpanded] = useState<number>(-1);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getQuestions = async () => {
      if (stack_id === -1) return;
      try {
        const response = await axiosPrivate.get(
          `/api/v1/question/get-questions/${stack_id}`,
          {
            signal: controller.signal,
          },
        );
        isMounted && response.status !== 204 && setQuestions(response.data);
      } catch (e: any) {
        if (e?.name === "CanceledError") console.log("Request Is Aborted");
        else {
          console.log(e);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getQuestions();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [stack_id]);

  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-5xl text-center font-extrabold text-slate-800">{stack_name}</h1>
      {questions.map((val) => (
        <section
          key={val.question_id}
          onClick={() =>
            setExpanded((prev) => {
              if (prev === val.question_id) return -1;
              else return val.question_id;
            })}
          className="shadow-sm py-4 cursor-pointer rounded-xl bg-blue-200 text-center font-bold text-xl"
        >
          <h1>{`${val.question_id} ${val.question}`}</h1>

          {val.question_id === expanded && (
            <>
              <hr className="border-slate-500 border-2 w-16 mx-auto my-4" />
              <h1 className=" ">{val.answer}</h1>
            </>
          )}
        </section>
      ))}
      <Button>Revise</Button>
    </section>
  );
};

export default ViewQuestionList;
