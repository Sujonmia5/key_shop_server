import { Model, ObjectId } from "mongoose";
import { USER_ROLE } from "./user.constent";

export type TRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface TUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface TAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface TUser {
  _id: ObjectId;
  name: TUserName;
  email: string;
  contactNo: string;
  password: string;
  role: TRole;
  profileImageUrl: string;
  address?: TAddress;
  isVerified: boolean;
  isDeleted: boolean;
}

export interface TUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistByEmail(email: string): Promise<TUser | null>;
}
