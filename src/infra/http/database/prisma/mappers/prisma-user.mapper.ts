import { User } from 'src/modules/user/entities/user.entity';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({ id, name, email, password, createdAt }: User): UserRaw {
    return {
      id,
      name,
      email,
      password,
      createdAt,
    };
  }

  static toDomain({ id, ...userData }: UserRaw): User {
    return new User(
      {
        ...userData,
      },
      id,
    );
  }
}
