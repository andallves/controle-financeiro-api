import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { compare } from 'bcrypt';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException('Email não encontrado.');

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) throw new UnauthorizedException('Senha incorreta.');

    return user;
  }
}
