import { useAddQuestionHook } from "@/context/AddQuestionContext";
import { QuestionType } from "@/lib/validators";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

const QuestionTile = (
  { setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> },
) => {
  const { question, setQuestion, setFormVal, nextId } = useAddQuestionHook();
  const handleDelete = (id: number) => {
    let newQuestion = [];
    for (let i = 0; i < question.length; i++) {
      if (question[i].question_id < id) newQuestion.push(question[i]);
      else if (question[i].question_id > id) {
        let newObj: QuestionType = {
          question_id: question[i].question_id - 1,
          question: question[i].question,
          answer: question[i].answer,
        };
        newQuestion.push(newObj);
      }
    }
    nextId.current = nextId.current - 1;
    setQuestion(newQuestion);
  };

  return (
    <>
      {question.map((value) => (
        value &&
        (
          <section
            key={value.question_id}
            className="relative max-w-[700px] h-36 w-full border-4 border-slate-600 rounded-xl p-5 mt-5 flex flex-col items-center overflow-hidden"
          >
            <h1 className="absolute left-4 top-4">{value.question_id}</h1>
            <IconPencil
              onClick={() => {
                setFormVal(value);
                setOpen(true);
              }}
              className="cursor-pointer absolute right-4 top-4"
            />
            <IconTrash
              onClick={() => handleDelete(value.question_id)}
              className="cursor-pointer absolute right-4 top-14 hover:text-red-500"
            />

            <h1 className="text-2xl h-10 overflow-hidden">
              <span className="font-black text-2xl">Q.</span>
              {value.question}
            </h1>
            <h1 className="text-xl h-16 overflow-hidden">
              <span className="font-black text-2xl">A.</span>
              {value.answer}
            </h1>
          </section>
        )
      ))}
    </>
  );
};

export default QuestionTile;
