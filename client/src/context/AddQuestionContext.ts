import { QuestionType } from "@/lib/validators";
import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
} from "react";

export interface AddQuestinoState {
  question: QuestionType[];
  setQuestion: Dispatch<SetStateAction<QuestionType[]>>;
  formVal: QuestionType;
  setFormVal: Dispatch<SetStateAction<QuestionType>>;
  nextId: MutableRefObject<number>;
}

export const AddQuestionContext = createContext<AddQuestinoState | undefined>(
  undefined,
);

export function useAddQuestionHook() {
  const state = useContext(AddQuestionContext);

  if (state === undefined) {
    throw new Error("useAddQuestionHook got a undefined value");
  }

  return {
    question: state.question,
    setQuestion: state.setQuestion,
    formVal: state.formVal,
    setFormVal: state.setFormVal,
    nextId: state.nextId,
  };
}
