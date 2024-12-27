import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCase/createUserUseCase/create-user.useCase';
import { CreateUserDto } from 'src/infra/http/modules/user/dtos/create-user.dto';
import { UserViewModel } from 'src/infra/http/modules/user/viewModel/user-view.model';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return UserViewModel.toHttp(user);
  }
}
