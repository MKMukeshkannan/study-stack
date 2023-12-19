import { z } from "zod";

const UserSchema = z
  .object({
    id: z.number(),
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
      .max(25, "Password too long - should be atmost 25 characteres")
      .min(8, "Password too short - should be 8 chars minimum"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
  });

const userSignUpValidator = UserSchema.omit({ id: true });
const userSignUpValidatorClient = userSignUpValidator.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password Must Match",
  path: ["confirmPassword"],
});

const userLoginValidator = UserSchema.pick({ email: true, password: true });

const userOnBodyValidator = z.object({
  user: UserSchema.pick({ id: true }),
});

const stackIdValidator = z.number();
const questionIdValidator = stackIdValidator;

const userStackNameBodyValidator = z.object({
  user: UserSchema.pick({ id: true }),
  stackName: z.string({
    required_error: "Stack name is required!!",
  })
    .min(4, "Name should be atleast 4 characters long !")
    .max(12, "Name should be atmost 12 characters long !"),
});

const questionsPostValidator = z.object({
  question_id: z.number({
    required_error: "Required 'question_id' feild",
  }),
  question: z.string({
    required_error: "Required 'question' feild",
  })
    .min(4, "Question Should be atleast 4 characters long !")
    .max(50, "Question can be atmost 50 characters long !"),
  answer: z.string({
    required_error: "Required 'answer' feild",
  })
    .min(4, "Answer Should be atleast 4 characters long !")
    .max(50, "Answer can be atmost 50 characters long !"),
});

const questionUpdateValidator = questionsPostValidator
  .omit({
    question_id: true,
  })
  .extend({ stack_id: z.number() });

type QuestionType = z.infer<typeof questionsPostValidator>;

type UserType = z.infer<typeof UserSchema>;

export {
  questionIdValidator,
  questionsPostValidator,
  QuestionType,
  questionUpdateValidator,
  stackIdValidator,
  userLoginValidator,
  userOnBodyValidator,
  UserSchema,
  userSignUpValidator,
  userSignUpValidatorClient,
  userStackNameBodyValidator,
  type UserType,
};
