import { User } from 'src/mongo/schemas/User.schema';

export interface IAuthUser {
  _id: string;
  sub: string;
  email: string;
  org_code: string;
  scp: Array<string>;
}
