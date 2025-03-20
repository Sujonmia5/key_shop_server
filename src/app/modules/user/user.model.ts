import { model, Schema } from "mongoose";
import { TAddress, TUser, TUserModel, TUserName } from "./user.interface";
import { USER_ROLE } from "./user.constent";
import bcrypt from "bcrypt";
import { config } from "../../config";
import AppError from "../../error/AppError";
import status from "http-status";

const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const addressSchema = new Schema<TAddress>(
  {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: userNameSchema,
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      required: true,
      enum: Object.values(USER_ROLE),
    },
    profileImageUrl: { type: String, default: "" },
    address: {
      type: addressSchema,
      default: {},
    },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.id;
        return ret;
      },
      virtuals: true,
    },
  }
);

userSchema.pre("findOneAndUpdate", async function (next) {
  const { _id } = this.getQuery();
  const user = await MUser.findById(_id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  } else if (user.isDeleted) {
    throw new AppError(status.NO_CONTENT, "User has been deleted");
  }
  next();
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});

userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.statics.isUserExistByEmail = async function (email) {
  return await MUser.findOne({ email }).select("+password");
};

userSchema.virtual("fullName").get(function () {
  return `${this.name?.firstName} ${this.name?.middleName} ${this.name?.lastName}`;
});

export const MUser = model<TUser, TUserModel>("User", userSchema);
