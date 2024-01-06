import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface QuestionType {
  question_id: number;
  question: string;
  answer: string;
  difficulty: number;
  lastRevised: Date;
}

export default function Revise() {
  const questionsRevised = useRef<number>(0);
  const questions = useRef<QuestionType[]>([]);
  const questionQueue = useRef<number[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const queueTop: number = questionQueue.current[0];

  useEffect(() => {
    setLoading(true);
    questions.current = [
      {
        question_id: 1,
        question: "What is the capital of Spain?",
        answer: "Madrid",
        difficulty: 2,
        lastRevised: new Date("2024-01-01"),
      },
      {
        question_id: 2,
        question: "Who wrote 'The Great Gatsby'?",
        answer: "F. Scott Fitzgerald",
        difficulty: 3,
        lastRevised: new Date("2024-01-02"),
      },
      {
        question_id: 3,
        question: "What is the chemical symbol for gold?",
        answer: "Au",
        difficulty: 1,
        lastRevised: new Date("2024-01-03"),
      },
      {
        question_id: 4,
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
        difficulty: 2,
        lastRevised: new Date("2024-01-04"),
      },
      {
        question_id: 5,
        question: "Who wrote 'To Kill a Mockingbird'?",
        answer: "Harper Lee",
        difficulty: 3,
        lastRevised: new Date("2024-01-05"),
      },
      {
        question_id: 6,
        question: "What is the world's largest ocean?",
        answer: "Pacific Ocean",
        difficulty: 2,
        lastRevised: new Date("2024-01-01"),
      },
      {
        question_id: 7,
        question: "Who discovered penicillin?",
        answer: "Alexander Fleming",
        difficulty: 3,
        lastRevised: new Date("2024-01-02"),
      },
      {
        question_id: 8,
        question: "What is the square root of 64?",
        answer: "8",
        difficulty: 1,
        lastRevised: new Date("2024-01-03"),
      },
      {
        question_id: 9,
        question: "Which gas do plants absorb during photosynthesis?",
        answer: "Carbon dioxide",
        difficulty: 2,
        lastRevised: new Date("2024-01-04"),
      },
      {
        question_id: 10,
        question: "Who is known as the 'Father of Computer Science'?",
        answer: "Alan Turing",
        difficulty: 3,
        lastRevised: new Date("2024-01-05"),
      },
      {
        question_id: 11,
        question: "What is the largest mammal on Earth?",
        answer: "Blue whale",
        difficulty: 2,
        lastRevised: new Date("2024-01-01"),
      },
      {
        question_id: 12,
        question: "Who developed the theory of relativity?",
        answer: "Albert Einstein",
        difficulty: 3,
        lastRevised: new Date("2024-01-02"),
      },
      {
        question_id: 13,
        question: "In which year did the Titanic sink?",
        answer: "1912",
        difficulty: 1,
        lastRevised: new Date("2024-01-03"),
      },
      {
        question_id: 14,
        question: "What is the currency of Japan?",
        answer: "Japanese Yen",
        difficulty: 2,
        lastRevised: new Date("2024-01-04"),
      },
      {
        question_id: 15,
        question: "Who is the author of '1984'?",
        answer: "George Orwell",
        difficulty: 3,
        lastRevised: new Date("2024-01-05"),
      },
    ];

    const currentDate = new Date();
    const selectedQuestions: number[] = [];
    for (let i = 0; i < questions.current.length; i++) {
      if (
        currentDate.getDate()  - questions.current[i].lastRevised.getDate() >  3
      ) {
        selectedQuestions.push(i);
      }
    }

    questionQueue.current = selectedQuestions;

    setLoading(false);
  }, []);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  if (isLoading) return <h1>Loading</h1>;
  console.log(questionQueue)

  return (
    <section className="flex flex-auto h-0 p-6">
      <section className="flex flex-col gap-5 justify-center items-center bg-white rounded-xl p-7 py-16 relative overflow-y-auto w-full lg:px-16">
        <h1 className="text-xl absolute right-7 top-7 font-bold">
          Personal Details
        </h1>

        <section
          className={cn(
            "rounded-xl bg-sky-200 w-full min-h-[130px] p-6 transition-all duration-1000",
            showAnswer ? "max-h-[100px]" : "max-h-[300px]",
          )}
        >
          <h1 className="text-xl font-semibold text-center h-full overflow-y-auto">
            {questions.current[queueTop].question}
          </h1>
        </section>

        <section
          className={cn(
            "rounded-xl bg-sky-200 w-full  min-h-[130px] max-h-[300px] p-6  transition-all duration-1000 delay-500",
            !showAnswer && " max-h-0 opacity-0",
          )}
        >
          <ReactMarkdown className="text-xl font-semibold text-center h-full overflow-y-auto">
            {questions.current[queueTop].question}
          </ReactMarkdown>
        </section>

        <section className="flex space-x-2 absolute bottom-4">
          {!showAnswer
            ? (
              <Button
                onClick={() => setShowAnswer((prev) => !prev)}
              >
                Reveal Answer
              </Button>
            )
            : (
              <>
                <Button>Easy</Button>
                <Button>Medium</Button>
                <Button>Hard</Button>
              </>
            )}
        </section>
      </section>
    </section>
  );
}
