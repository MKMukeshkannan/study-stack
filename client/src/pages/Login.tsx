import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <main className="flex flex-row h-screen w-full ">
      <aside className="bg-cover bg-green-300 w-0 lg:flex-1 h-full" />
      <section className="flex w-0 flex-1 items-center justify-center">
        <form className="flex flex-col gap-5 w-1/2 min-w-[300px]">
          <h1 className="text-4xl font-black pb-6">Login</h1>
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
          <Button type="submit" className="text-xl mt-4">Login</Button>
        </form>
      </section>
    </main>
  );
}
