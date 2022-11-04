import { NewUserI, UserI, UserQuery } from '../interfaces/usersInterfaces';
import { UsersAtlas } from '../models/userModels';
import { CartAPI} from './cartAPI';


class User {
  private users;

  constructor() {
    this.users = new UsersAtlas()
  }

  async getUsers(id?: string): Promise<UserI[]> {
    if (id) return this.users.get(id);

    return this.users.get();
  }

  async addUser(userData: NewUserI): Promise<UserI> {
    const newUser = await this.users.add(userData);
    await CartAPI.createCart(userData, newUser._id);
    return newUser;
  }

  async updateUser(id: string, userData : any) {
    const updatedUser = await this.users.update(id, userData);
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.users.delete(id);
    await CartAPI.deleteCart(id);
  }

  async query(username?: string, email?: string): Promise<UserI> {
    const query = {
      $or: [] as UserQuery[],
    };

    if (username) query.$or.push({ username });

    if (email) query.$or.push({ email });

    return this.users.query(query);
  }

  async ValidatePassword(username: string, password: string) {
    return this.users.validateUserPassword(username, password);
  }
}

export const UserAPI = new User();