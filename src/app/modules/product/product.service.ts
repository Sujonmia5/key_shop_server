import { JwtPayload } from "jsonwebtoken";
import { MUser } from "../user/user.model";
import AppError from "../../error/AppError";
import status from "http-status";
import { MKeyboard, MKeycap, MProduct, MSwitch } from "./product.model";
import { IProduct } from "./prodcut.interface";
import { category } from "./product.constent";
import QueryBuilder from "../../builder/QueryBuilder";
import {
  cloudinaryFilesDistroy,
  cloudinaryFilesUploader,
} from "../utils/uploadFiles";
import { TFile } from "../../interface/utils";

const createProduct = async (
  payload: IProduct,
  user: JwtPayload,
  files: TFile[]
) => {
  try {
    const userInfo = await MUser.isUserExistByEmail(user.email);
    if (!userInfo) {
      throw new AppError(status.NOT_FOUND, "User not found");
    }
    payload.sellerId = userInfo._id;

    const image = (await cloudinaryFilesUploader(files)) as string[];

    if (!image) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        "Failed to upload image"
      ); //
    }
    payload.images = image;
    let result;

    if (payload.category === category.KEYBOARD) {
      const keyboard = new MKeyboard(payload);
      result = await keyboard.save();
    }
    if (payload.category === category.SWITCH) {
      const switchModel = new MSwitch(payload);
      result = await switchModel.save();
    }
    if (payload.category === category.KEYCAP) {
      const keycap = new MKeycap(payload);
      result = await keycap.save();
    }
    if (payload.category === category.ACCESSORY) {
      const accessory = new MProduct(payload);
      result = await accessory.save();
    }
    return result;
  } catch (error) {
    await cloudinaryFilesDistroy(files);
    throw error;
  }
};

const getAllProduct = async (query: Record<string, unknown>) => {
  const searchQuery = new QueryBuilder(
    MProduct.find().populate("sellerId", "name email profileImageUrl fullName"),
    query
  )
    .searchQuery()
    .filter()
    .paginate();
  const result = await searchQuery.modelQuery;
  return result;
};

const getMyProduct = async (email: string, query: Record<string, unknown>) => {
  const userInfo = await MUser.isUserExistByEmail(email);
  if (!userInfo) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }
  const myProductQuery = new QueryBuilder(
    MProduct.find({
      sellerId: userInfo._id,
    }),
    query
  )
    .searchQuery()
    .filter()
    .paginate()
    .field();
  const result = await myProductQuery.modelQuery;

  return result;
};

const deleteProduct = async (productId: string) => {
  const result = await MProduct.findByIdAndUpdate(
    productId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};

export const productService = {
  createProduct,
  getAllProduct,
  deleteProduct,
  getMyProduct,
} as const;
