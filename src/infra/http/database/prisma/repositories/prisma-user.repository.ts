import { User } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { PrismaService } from 'src/infra/http/database/prisma/prisma.service';
import { PrismaUserMapper } from 'src/infra/http/database/prisma/mappers/prisma-user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userRaw = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userRaw) return null;

    return PrismaUserMapper.toDomain(userRaw);
  }
}
