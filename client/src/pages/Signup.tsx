import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Signup() {
  return (
    <main className="flex flex-row-reverse h-screen w-full ">
      <aside className="bg-cover bg-red-300 w-0 lg:flex-1 h-full" />
      <section className="flex w-0 flex-1 items-center justify-center">
        <form className="flex flex-col gap-5 w-1/2 min-w-[300px]">
          <h1 className="text-4xl font-black pb-6">Signup</h1>
          <Input
            type="text"
            placeholder="Name"
            className="rounded-none text-xl bordernone border border-white border-b-black "
          />
          <Input
            type="text"
            placeholder="Email"
            className="rounded-none text-xl bordernone border border-white border-b-black "
          />
          <Input
            type="password"
            placeholder="Password"
            className="rounded-none text-xl bordernone border border-white border-b-black "
          />
           <Input
            type="password"
            placeholder="Confirm Password"
            className="rounded-none text-xl bordernone border border-white border-b-black "
          />
         <Button type="submit" className="text-xl mt-4">Signup</Button>
        </form>
      </section>
    </main>
  );
}
