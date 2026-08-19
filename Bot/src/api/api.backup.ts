import { type Request, type Response } from "express";
import { getDrive } from "../utils/GoogleDrive.ts";
import fs from "node:fs";
import multer from "multer";
import { SendResponse } from "../utils/Utils.ts";
import { Router } from "express";
import { CheckSignature } from "../middleware.ts";

export const Routes = Router();
const Folder = process.env.DRIVE_FOLDER as string;
const upload = multer({ dest: "uploads/" });

Routes.post(
  "/backup",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const UploadedFile = req.file;
      if (!UploadedFile)
        return SendResponse(res, 400, false, "No File Uploaded");
      const drive = getDrive();

      const response = await drive.files.create({
        requestBody: {
          name: UploadedFile.originalname,
          parents: [Folder],
        },
        media: {
          mimeType: UploadedFile.mimetype,
          body: fs.createReadStream(UploadedFile.path),
        },
        supportsAllDrives: true,
      });
      if (response.status !== 200 && response.status !== 201)
        return SendResponse(
          res,
          400,
          false,
          "Failed to upload backup file to google drive",
        );
      await fs.promises.unlink(UploadedFile.path);
      return SendResponse(res, 200, true, "File Uploaded to google drive");
    } catch (e) {
      console.error(`somthing went wrong while handling backup upload, : ${e}`);
      return SendResponse(
        res,
        500,
        false,
        "Somthing went wrong while handling Backup file :(",
      );
    }
  },
);
