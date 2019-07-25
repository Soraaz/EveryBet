import { UserDto } from './../../Dtos/UserDto';
import { Router, Request, Response } from 'express';
import { Inject } from "typescript-ioc";
import multer from "multer";

import { IImageUploaderService } from '../../Services/DataBase/Interfaces/IImageUploaderService';
import { IDataBaseService } from '../../Services/DataBase/Interfaces/IDataBaseService';
import { ILog } from '../../Logs/ILog';

const upload = multer({ dest: 'uploads/' });

// api/images
export class ImagesController {
    public Router: Router;

    @Inject
    private db: IDataBaseService;
    @Inject
    private serverLog: ILog;
    @Inject
    private imageUploaderService: IImageUploaderService;

    constructor() {
        this.Router = Router();
        this.init();
    }

    public init() {
        this.Router.post('/upload/:id*?', upload.single('image'), this.upload.bind(this));
    }

    // POST api/images/upload
    public async upload(req: Request, res: Response) {
        try {
            let filter = new Map<string, object>(Object.entries(req.query));
            if (req.params.id)
                filter.set("id", req.params.id);
            filter = await this.db.prepareFilter(new Map<string, object>([["users", UserDto.GetInstanceWithDefaultValues()]]), filter);
			const file = await this.imageUploaderService.upload(filter, req.file);
            
            res.status(200);
            res.send(file);
        } catch (e) {
            this.serverLog.error(e.message);
            if (e.name === "ServerError"){
                res.status(e.status);
                res.send({
                    error: e.message,
                });
            }
            else {
                this.serverLog.error("Error: " + e.message + " / Route: POST api/images/upload");
                res.status(500);
                res.send({
                    error: "Unhandled error",
                });
            }
        }
    }
}

// Create the ImagesController, and export its configured Express.Router
const imagesController = new ImagesController();
imagesController.init();

export default imagesController.Router;