import StackTile from "@/components/StackTile";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import QuestionList from "@/components/ViewQuestionList";

export interface stack {
  stack_name: string;
  stack_id: number;
}

export default function Home() {
  const [stacks, setStacks] = useState<stack[]>([]);
  const [viewStack, setViewStack] = useState<stack | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getStacks = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/stack/get-stacks", {
          signal: controller.signal,
        });
        isMounted && response.status !== 204 && setStacks(response.data);
      } catch (e: any) {
        if (e?.name === "CanceledError") console.log("Request Is Aborted");
        else {
          console.log(e);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getStacks();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section className="flex h-0 flex-auto flex-row p-5">
      <section
        className={cn(
          "bg-white rounded-xl p-7 shadow relative overflow-y-auto w-full",
          isOpen && "hidden lg:block lg:mr-5",
        )}
      >
        <section className="flex flex-row flex-wrap gap-4 justify-center sm:justify-start">
          {stacks?.length <= 0
            ? <h1>No Stacks Created</h1>
            : stacks.map((stack) => (
              <StackTile
                key={stack.stack_id}
                stack_name={stack.stack_name}
                stack_id={stack.stack_id}
                setOpen={setOpen}
                setViewStack={setViewStack}
              />
            ))}
        </section>
      </section>

      <section
        className={cn(
          "relative bg-white h-full min-w-[400px] rounded-xl p-7 shadow transition-all duration-500 overflow-auto",
          !isOpen && "hidden",
        )}
      >
        <QuestionList
          stack_name={viewStack?.stack_name || ""}
          stack_id={viewStack?.stack_id || -1}
          setOpen={setOpen}
        />
      </section>
    </section>
  );
}
