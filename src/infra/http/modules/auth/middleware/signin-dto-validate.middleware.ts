import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthDto } from 'src/infra/http/modules/auth/dtos/auth.dto';
import { validate } from 'class-validator';

@Injectable()
export class SigninDtoValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const authDto = new AuthDto();
    authDto.email = body.email;
    authDto.password = body.password;

    const validations = await validate(authDto);

    if (validations.length) {
      throw new BadRequestException(validations);
    }

    next();
  }
}
