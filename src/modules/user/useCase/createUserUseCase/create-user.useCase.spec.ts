import { CreateUserUseCase } from 'src/modules/user/useCase/createUserUseCase/create-user.useCase';
import { UserInMemoryRepository } from 'src/modules/user/repositories/userInMemory.repository';
import { compare } from 'bcrypt';

describe('Create User', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryInMemory: UserInMemoryRepository;

  beforeEach(async () => {
    userRepositoryInMemory = new UserInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'name',
      password: '12312312',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to create user with password encrypted', async () => {
    const userPasswordWithoutEncryption = '1234';

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'name',
      password: userPasswordWithoutEncryption,
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });
});
