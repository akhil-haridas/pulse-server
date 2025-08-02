import express from "express";
import { authenticate, validate } from "@middlewares";

import { CreateLogSchema, GetLogByDateSchema, UpdateLogSchema } from "@validations";
import { getMyLogs, getLogByDateHandler, deleteDailyLog, updateDailyLog, createLogHandler } from "@controllers";

const router = express.Router();

router.use(authenticate);

router.post("/", validate(CreateLogSchema), createLogHandler);
router.get("/", getMyLogs);
router.get("/:date", validate(GetLogByDateSchema), getLogByDateHandler);
router.patch("/:id", validate(UpdateLogSchema), updateDailyLog);
router.delete("/:id", deleteDailyLog);

export default router;
