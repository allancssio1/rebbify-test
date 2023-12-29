import { Request } from 'express';
import { UserFromJwt } from '../auth/models/UserFromJwt';

export interface UserRequest extends Request {
  user: UserFromJwt;
}
