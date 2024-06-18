import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userReposiotry: UserRepository) {}

  async getAll() {
    return this.userReposiotry.findMany({});
  }

  async getUserById(id: number) {
    const user = await this.userReposiotry.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async getUserByEmail(email: string) {
    return this.userReposiotry.findUnique({ where: { email } });
  }

  async create(user: { email: string; password: string; name?: string }) {
    return this.userReposiotry.create({ data: user });
  }

  async delete(id: number) {
    return this.userReposiotry.delete({ where: { id } });
  }

  async update(
    id: number,
    user: { email?: string; password?: string; name?: string },
  ) {
    return this.userReposiotry.update({ where: { id }, data: user });
  }
}
