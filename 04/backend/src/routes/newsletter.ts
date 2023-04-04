import { Router } from "express";
import { createNewsLetter, getNewsLetter } from "../controls/newsletter";

const router = Router();

router.get("/", getNewsLetter);
router.post("/", createNewsLetter);

export default router;
