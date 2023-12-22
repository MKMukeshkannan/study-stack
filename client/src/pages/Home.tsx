import StackTile from "@/components/StackTile";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface stack {
  stack_name: string;
  stack_id: number;
}

export default function Home() {
  const [stacks, setStacks] = useState<stack[]>([]);
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
    <section>
      {stacks?.length <= 0
        ? <h1>No Stacks Created</h1>
        : stacks.map((stack) => (
          <StackTile key={stack.stack_id} name={stack.stack_name} />
        ))}
    </section>
  );
}
