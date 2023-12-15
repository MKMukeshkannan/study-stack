import StackTile from "@/components/StackTile";
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useEffect, useState } from "react";

interface stack {
  stack_name: string;
  stack_id: number;
}

export default function Home() {
  const [stacks, setStacks] = useState<stack[]>();
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getStacks = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/stack/get-stacks", {
          signal: controller.signal,
        });
        isMounted && setStacks(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getStacks();

    return () => {
      isMounted = false;
      controller.abort();
    };
  });

  return (
    <section>
      {stacks?.length
        ? <h1>No Stacks Created</h1>
        : stacks?.map((stack) => <StackTile name={stack.stack_name} />)}
    </section>
  );
}
