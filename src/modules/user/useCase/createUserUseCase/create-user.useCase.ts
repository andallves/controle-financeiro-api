import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { User } from 'src/modules/user/entities/user.entity';
import { hash } from 'bcrypt';

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password, name }: CreateUserRequest) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso.');
    }

    const user = new User({
      email,
      name,
      password: await hash(password, 10),
    });

    await this.userRepository.create(user);
    return user;
  }
}
