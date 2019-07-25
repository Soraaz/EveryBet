import { Provides, Inject } from "typescript-ioc";
import fs from "fs";
import path from "path";
import rimraf from "rimraf";

import { IDataBaseService } from "./Interfaces/IDataBaseService";
import { IImageUploaderService } from "./Interfaces/IImageUploaderService";
import { ServerError } from './../../Errors/ServerError';
import { SqlHelper } from "../../Utils/SqlHelper";

@Provides (IImageUploaderService)
export class ImageUploaderService implements IImageUploaderService {
    @Inject
    private db: IDataBaseService;

    // POST api/images/upload
    async upload(filter: Map<string, object>, file: Express.Multer.File): Promise<Express.Multer.File> {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
            throw new ServerError(400, "file type is not valid");

        const fileName = `${file.filename}${path.extname(file.originalname)}`;
        const initialPath = path.resolve(`${__dirname}/../../../../uploads/${file.filename}`);
        const destPath = path.resolve(`${__dirname}/../../../../public/images/uploads/${fileName}`);

        fs.rename(initialPath, destPath, () => {  });
        rimraf(initialPath, () => { });

        file.destination = "images/uploads/";
        file.path = `images/uploads/${file.filename}${path.extname(file.originalname)}`;
        delete file.originalname;
        delete file.originalname;

        const sql = "UPDATE users"
            + ` SET users.avatar='${file.path}'`
            + SqlHelper.where(filter);
        await this.db.execute(sql);

        return file;
    }
}