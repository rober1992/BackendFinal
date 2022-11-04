import Joi from 'joi';


export const userJoiSchema = Joi.object({
  firstName: Joi.string().min(4).max(15).required(),
  lastName: Joi.string().min(4).max(15).required(),
  email: Joi.string().email().required(),
  username: Joi.string().min(5).max(10).required(),
  password: Joi.string().min(3).max(15).required().label('Password'),
  password_confirmation: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
  address : Joi.string().required(),
  addressNumber: Joi.number().required(),
  state : Joi.string().required(),
  piso : Joi.string(),
  phonenumber : Joi.number().required(),
  postalCode : Joi.number().required(),
  admin : Joi.boolean(),
});

export interface NewUserI {
  _id : string ;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  password_confirmation : string;
  address : string;
  addressNumber : number;
  phonenumber : number;
  postalCode : number;
  state : string;
  piso : number;
  admin : Boolean;
}

export interface UserI {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phonenumber: number;
  admin: Boolean;
}

export interface UserQuery {
  username?: string;
  email?: string;
}

export interface UserBaseClass {
  get(id?: string | undefined): Promise<UserI[]>;
  add(data: NewUserI): Promise<UserI>;
  update(id: string, newProductData: NewUserI): Promise<UserI>;
  delete(id: string): Promise<void>;
}