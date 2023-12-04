import { z } from "zod";

const userSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(4, "Name should be atleast 4 characters")
      .max(15, "Name should be atmost 15 characters"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password too short - should be 6 chars minimum"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
  })

const userSchemaID = userSchema.extend({ id: z.number() })

type UserType = z.infer<typeof userSchemaID>;


const stackSchema = z.object({
  stack_name: z.string()
})

export { userSchema, UserType, stackSchema };
