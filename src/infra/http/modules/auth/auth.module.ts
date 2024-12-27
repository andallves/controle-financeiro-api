import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from 'src/infra/http/modules/auth/auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { DatabaseModule } from 'src/infra/http/database/database.module';
import { ValidateUserUseCase } from 'src/modules/auth/useCase/validateUserUseCase/validate-user.useCase';
import { UserModule } from 'src/infra/http/modules/user/user.module';
import { SignInUseCase } from 'src/modules/auth/useCase/signInUseCase/signIn.useCase';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { SigninDtoValidateMiddleware } from 'src/infra/http/modules/auth/middleware/signin-dto-validate.middleware';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SigninDtoValidateMiddleware).forRoutes('/signIn');
  }
}
