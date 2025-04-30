import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dajuehslw",
  api_key: "348358612886431",
  api_secret: "3NN1k-Y3nHrwm6ptBENNBRytMpo",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "linkedin_posts",
    allowed_formats: ["jpg", "jpeg", "png", "mp4"],
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

export { cloudinary, storage };
