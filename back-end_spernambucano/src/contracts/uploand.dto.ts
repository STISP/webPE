export type FileDTO = {
    filename: string;
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
};