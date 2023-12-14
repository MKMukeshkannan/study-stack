import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userSignUpValidatorClient } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function Signup() {
  type TUserSignUpClient = z.infer<typeof userSignUpValidatorClient>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<
    TUserSignUpClient
  >({
    resolver: zodResolver(userSignUpValidatorClient),
  });
  const navigate = useNavigate();

  const onsubmit = async (data: TUserSignUpClient) => {
    try {
      const response = await axios.post("/api/v1/auth/sign-up", data);
      if (response.statusText === "OK") {
        return navigate("/login");
      }
    } catch (e) {
      setError("root", {
        type: "server",
        message: "Somthing With The Server",
      });
    }
  };

  return (
    <main className="flex flex-row-reverse h-screen w-full ">
      <aside className="bg-cover bg-red-300 w-0 lg:flex-1 h-full" />
      <section className="flex w-0 flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col gap-5 w-1/2 min-w-[300px]"
        >
          <h1 className="text-4xl font-black pb-6">Signup</h1>
          <Input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="rounded-none text-xl bordernone border border-white border-b-black "
          />
          {errors.name && (
            <p className="text-red-500 ">{`* ${errors.name.message}`}</p>
          )}
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

          <Input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="rounded-none text-xl bordernone border border-white border-b-black "
          />
          {errors.confirmPassword && (
            <p className="text-red-500 ">
              {`* ${errors.confirmPassword.message}`}
            </p>
          )}

          {errors.root && (
            <p className="bg-red-400 text-white font-bold p-4 rounded-xl text-center">
              {`${errors.root.message}`}
            </p>
          )}

          <Button
            disabled={isSubmitting}
            type="submit"
            className="text-xl mt-4"
          >
            Signup
          </Button>
        </form>
      </section>
    </main>
  );
}
