import { Injectable } from '@nestjs/common'
import { User, UserRole } from 'src/domain/entities'
import { UserRepository } from 'src/domain/repositories/user.respository'
import { PrismaService } from 'src/shared/services/prisma.service'
@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    if (!users) {
      return []
    }
    return users.map(
      (u: User) =>
        new User(u.id, u.email, u.password, u.role as string as UserRole),
    )
  }

  async findById(id: string): Promise<User | null> {
    const u = await this.prisma.user.findUnique({
      where: { id },
    })

    return u ? new User(u.id, u.email, u.password, u.role as UserRole) : null
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        password: user.password,
        role: user.role,
      },
      create: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const u = await this.prisma.user.findUnique({
      where: { email },
    })

    return u ? new User(u.id, u.email, u.password, u.role as UserRole) : null
  }
}
