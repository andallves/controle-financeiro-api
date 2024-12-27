import { ValidateUserUseCase } from 'src/modules/auth/useCase/validateUserUseCase/validate-user.useCase';
import { UserInMemoryRepository } from 'src/modules/user/repositories/userInMemory.repository';
import { hash } from 'bcrypt';
import { makeUser } from 'src/modules/user/factories/user.factory';
import { UnauthorizedException } from '@nestjs/common';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserInMemoryRepository;

describe('ValidateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserInMemoryRepository();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to return user when credentials are correct', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('Should be able to throw error when credentials incorrect', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    await expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(UnauthorizedException);

    await expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
