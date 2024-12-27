import { SignInUseCase } from 'src/modules/auth/useCase/signInUseCase/signIn.useCase';
import { JwtService } from '@nestjs/jwt';
import { makeUser } from 'src/modules/user/factories/user.factory';
import { UserPayload } from 'src/modules/auth/models/user-payload';

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Should be able to create valid access_token', async () => {
    const user = makeUser({});

    const token = await signInUseCase.execute({
      user,
    });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
