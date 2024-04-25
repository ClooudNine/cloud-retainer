import * as Minio from 'minio';

export const minioClient = new Minio.Client({
    endPoint: 'content.retainer.cloud',
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!,
});
