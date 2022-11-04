import { Request, Response, NextFunction } from 'express';

const admin = true;

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log('EJECUTANDO MIDDLEWARE');
  const user : any = req.user;
  if (user.admin == true) next();
  else {
    res.status(401).json({
      msg: 'No estas autorizado',
    });
  }
};