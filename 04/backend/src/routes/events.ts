import { Router } from "express";
const router = Router();
import {
	checkEventId,
	getAllEvents,
	getEvent,
	getEventIdList,
	getFilterEvents,
} from "../controls/events";

router.param("id", checkEventId);

router.get("/", getAllEvents);
router.get("/id", getEventIdList);
router.get("/:id", getEvent);
router.get("/:year/:month", getFilterEvents);

export default router;
