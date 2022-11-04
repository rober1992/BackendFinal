
import { Request, Response, NextFunction } from 'express';
import { UserAPI } from '../apis/userAPI';
import { userJoiSchema } from '../interfaces/usersInterfaces';

class User {
  async validateUserInput(req: Request, res: Response, next: NextFunction) {
    try {
      await userJoiSchema.validateAsync(req.body);

      const { username, email } = req.body;

      const user = await UserAPI.query(username, email);
      if (!user) next();
      else res.status(400).json({ msg: 'invalid username or email' });
    } catch (err) {
      if (err instanceof Error) res.status(400).json({ msg: err.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    if(req.params.id) {
      const data = await UserAPI.getUsers(req.params.id);
      res.json({ users : data });
    } else {
      const data = await UserAPI.getUsers();
      res.json({user : data})
    }
  }

  async addUser(req: Request, res: Response) {
    const newItem = await UserAPI.addUser(req.body);
    res.json({ msg: 'ADD USER', newItem });
  }

  async updateUser(req: Request, res: Response) {
    const { id, data } = req.body
    const updatedUser = await UserAPI.updateUser(id,data);
    res.json({ msg: 'UPDATE USER' });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.body
    await UserAPI.deleteUser(id);
    res.json({ msg: 'DELETE USER' });
  }
}

export const UserController = new User();