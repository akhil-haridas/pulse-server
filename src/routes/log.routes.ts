import express from "express";
import { authenticate, validate } from "@middlewares";
import { createLogSchema, updateLogSchema } from "@validations";
import { createLog, getLogs, updateLog, deleteLog } from "@controllers";

const router = express.Router();

router.use(authenticate);

router.get("/", getLogs);
router.post("/", validate(createLogSchema), createLog);
router.put("/:id", validate(updateLogSchema), updateLog);
router.delete("/:id", deleteLog);

export default router;
