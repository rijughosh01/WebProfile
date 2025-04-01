import { Router } from "express";
import {
  register,
  login,
  uplodeProfilePicture,
  updateUserProfile,
  getUserAndProfile,
  updateProfileData,
  getAllUserProfile,
  downloadProfile,
  sendConnectionRequest,
  acceptConnectionRequest,
  getMyConnectionRequests,
  whatAreMyConnections,
} from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route("/update_profile_picture")
  .post(upload.single("profile_picture"), uplodeProfilePicture);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user_and_profile").get(getUserAndProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/user/get_all_users").get(getAllUserProfile);
router.route("/user/download_resume/:id").get(downloadProfile);
router.route("/user/send_connection_request").post(sendConnectionRequest);
router.route("/user/getConnectionRequests").get(getMyConnectionRequests);
router.route("/user/user_connection_request").get(whatAreMyConnections);
router.route("/user/accept_connection_request").post(acceptConnectionRequest);

export default router;
