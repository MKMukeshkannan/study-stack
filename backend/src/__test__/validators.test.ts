import { UserSchema } from "../utils/validators";

describe("User Validator", () => {
  it("should return same object for valid data", () => {
    const user = {
      id: 5,
      name: "MukeshKannan",
      email: "mukeshkannan@gmail.com",
      password: "Test@123",
    };
    const parsedUser = UserSchema.parse(user);
    expect(parsedUser).toEqual({
      id: 5,
      name: "MukeshKannan",
      email: "mukeshkannan@gmail.com",
      password: "Test@123",
    });
  });

  it("should throw error even if one feild is missing", () => {
    const userWithoutName = {
      id: 5,
      email: "mukeshkannan@gmail.com",
      password: "Test@123",
    };

    const userWithoutEmail = {
      id: 5,
      name: "MukeshKannan",
      password: "Test@123",
    };

    const userWithoutPassword = {
      id: 5,
      email: "mukeshkannan@gmail.com",
      password: "Test@123",
    };

    const userWithoutId = {
      name: "MukeshKannan",
      email: "mukeshkannan@gmail.com",
      password: "Test@123",
    };

    expect(() => UserSchema.parse(userWithoutName)).toThrow();
    expect(() => UserSchema.parse(userWithoutId)).toThrow();
    expect(() => UserSchema.parse(userWithoutEmail)).toThrow();
    expect(() => UserSchema.parse(userWithoutPassword)).toThrow();
  });

  it("should throw error for invalid email", () => {
    const user = { id: 5, name: "mukesh", password: "Test@123" };
    const emailMissingAT = {
      ...user,
      email: "mukeshkannangmail.com",
    };
    const emailMissingDOT = {
      ...user,
      email: "mukeshkannan@gmailcom",
    };
    const emailMissingHEAD = {
      ...user,
      email: "@gmail.com",
    };
    const emailNumber = {
      ...user,
      email: 5,
    };
    expect(() => UserSchema.parse(emailNumber)).toThrow();
    expect(() => UserSchema.parse(emailMissingAT)).toThrow();
    expect(() => UserSchema.parse(emailMissingDOT)).toThrow();
    expect(() => UserSchema.parse(emailMissingHEAD)).toThrow();
  });

  it("should throw error for invalid name", () => {
    const user = { id: 5, email: "mukesh@gmail.com", password: "Test@123" };
    const userNameLessThanFour = { ...user, name: "muk" };
    const userNameMoreThanFifteen = {
      ...user,
      name: "abcdefghijklmnopqrstuvwxyz",
    };
    const userNameNumber = { ...user, name: 15 };

    expect(() => UserSchema.parse(userNameLessThanFour)).toThrow();
    expect(() => UserSchema.parse(userNameMoreThanFifteen)).toThrow();
    expect(() => UserSchema.parse(userNameNumber)).toThrow();
  });

  it("should throw error for invalid password", () => {
    const user = { name: "mukeshkannan", email: "mukesh@gmail.com" };
    const userPasswordLessThanEight = { ...user, password: "muk" };
    const userPasswordMoreThanTwentyFive = {
      ...user,
      password: "abcdefghijklmnopqrstuvwxyz12345",
    };
    const userPasswordNumber = { ...user, password: 15 };

    expect(() => UserSchema.parse(userPasswordNumber)).toThrow();
    expect(() => UserSchema.parse(userPasswordMoreThanTwentyFive)).toThrow();
    expect(() => UserSchema.parse(userPasswordLessThanEight)).toThrow();
  });
});
