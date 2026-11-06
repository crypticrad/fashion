import { User } from '../interface/users.interface.js';

export class CreateUserDto implements Partial<User> {
  age: number;
  name: string;
}
