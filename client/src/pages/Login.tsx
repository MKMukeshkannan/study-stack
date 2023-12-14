import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useAuthContext } from "@/context/AuthContext";
import { backend } from "@/lib/utils";
import { userLoginValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../lib/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  type TUserLoginValidator = z.infer<typeof userLoginValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TUserLoginValidator>({
    resolver: zodResolver(userLoginValidator),
  });

  const onSumbit = async (data: TUserLoginValidator) => {
    try {
      const response = await axios.post("/api/v1/auth/login", data);
      // setAuth(response.data)
      console.log(response.data);
    } catch (err: any) {
      if (!err?.response) {
        setError("root", {
          type: "server",
          message: "No response from the server",
        });
      } else if (err.response?.status === 400) {
        setError("root", {
          type: "badrequest",
          message: "Password or Email might be wrong",
        });
      } else {
        setError("root", {
          type: "loginfailed",
          message: "Login Failed",
        });
      }
    }
  };

  return (
    <main className="flex flex-row h-screen w-full ">
      <aside className="bg-cover bg-green-300 w-0 lg:flex-1 h-full" />
      <section className="flex w-0 flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSumbit)}
          className="flex flex-col gap-5 w-1/2 min-w-[300px]"
        >
          <h1 className="text-4xl font-black pb-6">Login</h1>
          <Input
            {...register("email")}
            type="text"
            placeholder="Email"
            className="rounded-none text-xl bordernone border border-white border-b-black "
          />
          {errors.email && (
            <p className="text-red-500 ">{`* ${errors.email.message}`}</p>
          )}

          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="rounded-none text-xl bordernone border border-white border-b-black "
          />
          {errors.password && (
            <p className="text-red-500 ">{`* ${errors.password.message}`}</p>
          )}

          {errors.root && (
            <p className="bg-red-400 text-white font-bold p-4 rounded-xl text-center">
              {`${errors.root.message}`}
            </p>
          )}

          <Button
            type="submit"
            className="text-xl mt-4"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </form>
      </section>
    </main>
  );
}
