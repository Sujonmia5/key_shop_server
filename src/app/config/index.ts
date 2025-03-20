import dotenv from "dotenv";

import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  db_url: process.env.DB_URL,
  port: process.env.PORT || 5000,
  bcrypt_salt: process.env.BCRYPT_SALT,
  jwt_secret: process.env.JWT_SECRET_KEY,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET_KEY,
};
