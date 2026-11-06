import { Injectable } from '@nestjs/common';
import { User } from './interface/users.interface.js';

@Injectable()
export class UsersService {
  private users: User[] = [];

  list() {
    return this.users;
  }

  listById(id: string) {
    return this.users.find((f) => f.id == id);
  }

  create(user: User) {
    this.users.push(user);
    return this.users;
  }

  update(user: User) {
    this.users = this.users.map((f) => {
      if (f.id == user.id) {
        return {
          ...f,
          ...user,
        };
      }
      return f;
    });
    return this.users;
  }

  delete(id: string) {
    this.users = this.users.filter((f) => f.id !== id);
    return this.users;
  }
}
