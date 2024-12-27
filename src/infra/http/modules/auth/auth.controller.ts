import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRequestModel } from 'src/infra/http/modules/auth/models/auth-request.model';
import { SignInUseCase } from 'src/modules/auth/useCase/signInUseCase/signIn.useCase';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthenticatedRequestModel } from 'src/infra/http/modules/auth/models/authenticated-request.model';

@Controller()
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel) {
    return await this.signInUseCase.execute({
      user: request.user,
    });
  }

  @Get('test')
  async teste(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
