import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "linkedin_posts",
    allowed_formats: ["jpg", "jpeg", "png", "mp4"],
    resource_type: "auto",
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

export { cloudinary, storage };