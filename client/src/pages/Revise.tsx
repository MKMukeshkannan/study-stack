import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QuestionType } from "@/lib/validators";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Revise() {
  const questions: QuestionType[] = [{
    question_id: 1,
    question:
      "QUESTION : Sint proident non anim non irure ad consectetur consequat culpa officia voluptate occaecat officia id. Sit nulla pariatur labore est id nisi elit do. Cupidatat non ullamco ex exercitation cupidatat est quis aute sit est velit. Ullamco incididunt fugiat cillum duis aute minim aute. Laboris commodo ea duis nulla cillum dolor fugiat cupidatat ex veniam mollit nostrud anim aute. Esse ipsum amet do culpa ad in laboris veniam proident pariatur aliquip veniam enim ea exercitation. Id nulla excepteur nostrud cupidatat occaecat et nulla et nostrud cillum est ut irure nisi commodo. Adipisicing non ad qui cillum velit cupidatat occaecat officia minim dolore exercitation.",
    answer:
      "ANSWER : _int_ **proident** non anim non irure ad consectetur consequat culpa officia voluptate occaecat officia id. Sit nulla pariatur labore est id nisi elit do. Cupidatat non ullamco ex exercitation cupidatat est quis aute sit est velit. Ullamco incididunt fugiat cillum duis aute minim aute. Laboris commodo ea duis nulla cillum dolor fugiat cupidatat ex veniam mollit nostrud anim aute. Esse ipsum amet do culpa ad in laboris veniam proident pariatur aliquip veniam enim ea exercitation. Id nulla excepteur nostrud cupidatat occaecat et nulla et nostrud cillum est ut irure nisi commodo. Adipisicing non ad qui cillum velit cupidatat occaecat officia minim dolore exercitation.",
  }, {
    question_id: 1,
    question: "What is your name ?",
    answer: "Its MK",
  }];
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

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
            {questions[0].question}
          </h1>
        </section>

        <section
          className={cn(
            "rounded-xl bg-sky-200 w-full  min-h-[130px] max-h-[300px] p-6  transition-all duration-1000 delay-500",
            !showAnswer && " max-h-0 opacity-0",
          )}
        >
          <ReactMarkdown className="text-xl font-semibold text-center h-full overflow-y-auto">
            {questions[0].answer}
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
