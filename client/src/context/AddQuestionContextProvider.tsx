import { ReactNode, useRef, useState } from "react";
import { AddQuestionContext } from "./AddQuestionContext";
import { QuestionType } from "@/lib/validators";

interface props {
  children: ReactNode;
}

export default function AddQuestionContextProvider({ children }: props) {
  const [question, setQuestion] = useState<QuestionType[]>([]);
  const [formVal, setFormVal] = useState<QuestionType>({
    question_id: -1,
    question: "",
    answer: "",
  });
  const nextId = useRef<number>(1)

  return (
    <AddQuestionContext.Provider
      value={{ question, setFormVal, setQuestion, formVal, nextId }}
    >
      {children}
    </AddQuestionContext.Provider>
  );
}
