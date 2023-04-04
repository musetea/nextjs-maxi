import fs from "node:fs/promises";
import { Router } from "express";
import path from "path";

export type MeetUpType = {
	id: string;
	title: string;
	image: string;
	address: string;
	description: string;
};

const MeetUpPath = path.resolve(__dirname, "../../data/meetup.json");
const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const files = await fs.readFile(MeetUpPath, "utf-8");
		const meetups = JSON.parse(files);
		return res.json({
			status: "success",
			MEETUP: meetups,
		});
	} catch (err: any) {
		res.status(500).json({ status: "fail", message: err.message });
	}
});

router.post("/", async (req, res, next) => {
	const meetup = req.body;
	console.log(meetup);
	if (!meetup) {
		return res.status(400).json({
			status: "fail",
			message: "MeetUp Body is null",
		});
	}
	const files = await fs.readFile(MeetUpPath, "utf-8");
	const meetups = JSON.parse(files) as MeetUpType[];
	const findIdx = meetups.findIndex(m => m.id === meetup.id);
	if (findIdx >= 0) {
		return res.status(400).json({
			status: "fail",
			message: `${meetup.id} 항목이 이미 존재합니다.`,
		});
	}
	meetups.push(meetup);
	const results = await fs.writeFile(MeetUpPath, JSON.stringify(meetups));
	console.log(results);
	return res.status(201).json({
		status: "success",
		message: results,
	});
});

export default router;
