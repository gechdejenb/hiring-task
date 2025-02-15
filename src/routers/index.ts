/** @format */

import express from "express";
import { authRouter } from "./auth.router";
import {feedbackRouter} from "./feedback.router";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/api",feedbackRouter);

export default router;
