import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { UserPayload } from 'src/modules/auth/models/user-payload';
import { JwtService } from '@nestjs/jwt';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
    };

    return this.jwtService.sign(payload);
  }
}
