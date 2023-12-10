import { userSignUpValidator } from "../utils/validators";

describe("Sign Up Validator", () => {
  it("should return same object for valid data", () => {
    const user = {
      name: "MukeshKannan",
      email: "mukeshkannan@gmail.com",
      password: "Test@123",
    };
    const parsedUser = userSignUpValidator.parse(user);
    expect(parsedUser).toEqual({
      name: "MukeshKannan",
      email: "mukeshkannan@gmail.com",
      password: "Test@123",
    });
  });
});
