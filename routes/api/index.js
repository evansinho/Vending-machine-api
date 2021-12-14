import express from "express";
import usersRouter from "./users.js";

const router = express.Router();

router.use("/", usersRouter);

export default router;
