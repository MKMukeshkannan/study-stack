import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useRef, useState } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper/modules";
import "swiper/css";

import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

interface QuestionDifficulty {
  question_id: number;
  difficulty: number;
}

interface QuestionType {
  stack_id: number;
  question_id: number;
  question: string;
  answer: string;
  difficulty: number;
  last_revised: string;
}

const SectionWraper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-auto h-0 p-6">
      <section className="flex flex-col gap-5 justify-center items-center bg-white rounded-xl p-7 py-16 relative overflow-y-auto w-full lg:px-16">
        {children}
      </section>
    </section>
  );
};

export default function Revise() {
  const [questionsRevised, setQuestionRevised] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionType[]>([{
    question: "",
    answer: "",
    difficulty: 3,
    last_revised: "",
    question_id: -1,
    stack_id: -1,
  }]);
  const questionQueue = useRef<number[]>([]);
  const AnswerFlipSwiperRef = useRef<SwiperRef>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isRevised, setRevised] = useState<boolean>(false);
  const questionOccurance = useRef<Map<number, number>>(new Map());

  const queueTop: number = questionQueue.current[0];

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { id } = useParams();
  const stack_id = parseInt(id || "-1");

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const controller = new AbortController();

    const getQuestions = async () => {
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
          navigate("/");
        }
      }
    };

    getQuestions();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [stack_id]);

  useEffect(() => {
    const initializeQueue = () => {
      const currentDate = new Date();

      const selectedQuestions: number[] = [];
      for (let i = 0; i < questions.length; i++) {
        if (
          currentDate.getDate() -
              new Date(questions[i].last_revised).getDate() >
            3
        ) {
          selectedQuestions.push(i);
        }
      }

      if (selectedQuestions.length < 4) {
        for (let i = 0; i < questions.length; i++) {
          selectedQuestions.push(i);
        }
      }

      questionQueue.current = selectedQuestions;
      setLoading(false);
    };
    initializeQueue();
  }, [questions]);

  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const randomIndex = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleNextButton = (difficulty: number) => {
    if (questionsRevised >= 20 || questionQueue.current.length <= 1) {
      return setRevised(true);
    }

    const occurance = questionOccurance.current?.get(queueTop) || 0;
    const changedQueue = questionQueue.current;
    questions[queueTop].difficulty = difficulty;
    console.log(questions[queueTop]);

    if (difficulty == 1 && occurance < 1) {
      const end = changedQueue.length > 5 ? 3 : changedQueue.length;
      const pos = randomIndex(2, end);

      questionOccurance.current.set(queueTop, occurance + 1);
      changedQueue.splice(pos, 0, queueTop);
    } else if (difficulty == 2 && occurance < 2) {
      const end = changedQueue.length > 5 ? 3 : changedQueue.length;
      const pos = randomIndex(2, end);

      questionOccurance.current.set(queueTop, occurance + 1);
      changedQueue.splice(pos, 0, queueTop);
    } else if (difficulty == 3 && occurance < 3) {
      const end = changedQueue.length > 5 ? 3 : changedQueue.length;
      const pos = randomIndex(2, end);

      questionOccurance.current.set(queueTop, occurance + 1);
      changedQueue.splice(pos, 0, queueTop);
    }

    AnswerFlipSwiperRef.current?.swiper.slideTo(0);
    setShowAnswer(false);
    setQuestionRevised((prev) => prev + 1);
    questionQueue.current = changedQueue.splice(1);
  };

  const handleShowButton = () => {
    AnswerFlipSwiperRef.current?.swiper.slideNext();
    setShowAnswer(true);
  };

  if (isLoading) {
    return (
      <SectionWraper>
        <div
          className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <h1 className="text-xl font-bold">Loading</h1>
      </SectionWraper>
    );
  }
  if (isRevised) {
    let data: QuestionDifficulty[] = [];
    let totalDifficulty = 0;
    for (let question of questions) {
      totalDifficulty += question.difficulty;
      data.push({
        question_id: question.question_id,
        difficulty: question.difficulty,
      });
    }

    const confidence = Math.floor((3 * questions.length) - totalDifficulty) /
      (2 * questions.length) * 100;

    const updateConfidence = async () => {
      try {
        await axiosPrivate.put(
          `http://localhost:6969/api/v1/question/update-difficulty/${stack_id}`,
          { data, confidence },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );
      } catch (e: any) {
        console.log(e);
      }
    };
    updateConfidence();

    return <SectionWraper>Results</SectionWraper>;
  }

  return (
    <SectionWraper>
      <h1 className="text-xl absolute right-7 top-7 font-bold">
        Personal Details
      </h1>

      <Swiper
        flipEffect={{ slideShadows: false }}
        modules={[EffectFlip]}
        effect="flip"
        className="w-full h-96 rounded-lg py-10 text-xl lg:w-[400px]"
        ref={AnswerFlipSwiperRef}
        allowTouchMove={false}
      >
        <SwiperSlide className="bg-red-200 flex items-center justify-center text-center rounded-lg p-5">
          {questions[queueTop].question}
        </SwiperSlide>

        <SwiperSlide className="bg-red-200 rounded-lg p-5">
          <ReactMarkdown className="h-full flex items-center justify-center text-center overflow-auto">
            {questions[queueTop].answer}
          </ReactMarkdown>
        </SwiperSlide>
      </Swiper>

      <section className="flex space-x-2 absolute bottom-4">
        {!showAnswer
          ? (
            <Button onClick={handleShowButton}>
              Reveal Answer
            </Button>
          )
          : (
            <>
              <Button onClick={() => handleNextButton(1)}>Easy</Button>
              <Button onClick={() => handleNextButton(2)}>Medium</Button>
              <Button onClick={() => handleNextButton(3)}>Hard</Button>
            </>
          )}
      </section>
    </SectionWraper>
  );
}
