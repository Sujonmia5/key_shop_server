import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config";
import { TFile } from "../../interface/utils";
import { unlink } from "node:fs";

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_key,
  api_secret: config.cloudinary_secret,
});

export const cloudinaryFilesUploader = (files: TFile[]) => {
  const uploadFiles = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        file.path,
        { public_id: file?.originalname },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result?.secure_url);
            unlink(file?.path, (err) => {
              if (err) {
                // console.error(`Error deleting file ${file.path}: ${err}`);
              }
            });
          }
        }
      );
    });
  });
  return Promise.all(uploadFiles);
};

export const cloudinaryFilesDistroy = (files: TFile[]) => {
  const destroyFiles = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(file?.originalname, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          unlink(file?.path, (err) => {
            if (err) {
              // console.error(`Error deleting file ${file.path}: ${err}`);
            }
          });
        }
      });
    });
  });
  return Promise.all(destroyFiles);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
