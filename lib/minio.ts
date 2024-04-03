import * as Minio from 'minio'
export const minioClient = new Minio.Client({
    endPoint: "content.retainer.cloud",
    useSSL: true,
    accessKey: "kxbYK7mfAKHdMWEeFBz7",
    secretKey: "kUDkc1OWKxQpm7PbFBnnpgeNOmk1JlRqrPh59jxE"
})