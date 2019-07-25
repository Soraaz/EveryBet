export abstract class IImageUploaderService {
    // POST api/images/upload
    abstract upload(filter: Map<string, object>, file: Express.Multer.File): Promise<Express.Multer.File>;
}