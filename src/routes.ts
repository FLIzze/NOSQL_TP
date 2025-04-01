import express from "express";
import profileRoutes from "./api/profiles/index";

const router = express.Router();

router.use("/profiles", profileRoutes);

export default router;
