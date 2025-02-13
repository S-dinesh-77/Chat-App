import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import multer from "multer";

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// app.post("/api/auth/update-profile", upload.single("profileImage"), (req, res) => {
//   // Handle file upload
// });

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile",upload.single("profileImage"), protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;