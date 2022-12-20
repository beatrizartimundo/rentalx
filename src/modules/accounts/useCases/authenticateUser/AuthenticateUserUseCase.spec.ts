import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {

    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "testex@teste.com",
      password: "teste123",
      name: "Testex testador"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token");
});

  it("should not be able to authenticate a non-existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "idonotexist@void.com",
        password: "dontHave123"

      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a wrong password", () =>{

    expect (async() => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "tester@teste.com",
        password: "1234",
        name: "Testador da senha errada"
      }
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "4321"
      })
    }).rejects.toBeInstanceOf(AppError);

  })

});