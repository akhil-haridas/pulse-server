import express from "express";
import { authenticate, validate } from "@middlewares";
import { getMe, updateMe } from "@controllers";
import { updateProfileSchema } from "@validations";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.put("/me", authenticate, validate(updateProfileSchema), updateMe);

export default router;
