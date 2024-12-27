import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUserUseCase } from 'src/modules/auth/useCase/validateUserUseCase/validate-user.useCase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    return this.validateUserUseCase.execute({ email, password });
  }
}
