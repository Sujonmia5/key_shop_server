import { TUser } from "./user.interface";
import { MUser } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await MUser.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await MUser.find({});
  return result;
};

const updateUserInfoIntoDB = async (id: string, payload: Partial<TUser>) => {
  const { address, contactNo, profileImageUrl, name } = payload;

  const updatedData: Record<string, unknown> = { contactNo, profileImageUrl };

  if (address && Object.keys(address).length) {
    for (const [keys, value] of Object.entries(address)) {
      updatedData[`address.${keys}`] = value;
    }
  }

  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      updatedData[`name.${keys}`] = value;
    }
  }
  const result = await MUser.findByIdAndUpdate(id, updatedData, { new: true });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await MUser.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  updateUserInfoIntoDB,
  deleteUserFromDB,
} as const;
