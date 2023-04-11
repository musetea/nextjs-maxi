import { getItems, MeetUpType } from "@/models/meetup";
import type { NextApiRequest, NextApiResponse } from "next";
import { insertItem, getItem } from "@/models/meetup";
import { ObjectId } from "bson";

const error = (code: number, msg: string, res: NextApiResponse) => {
	return res.status(code).json({
		status: "fail",
		message: msg,
	});
};

const asyncGet = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		console.log("req:", req.query);
		const get = req.query.get;
		let result;
		let filter = {};
		if (get === "ids") {
			filter = {};
			const projection = {
				_id: 1,
			};
			console.log(filter, projection);
			result = await getItems(filter, { projection });
			const prams = [];
			result.forEach(i => {
				prams.push({
					params: {
						id: i._id.toString(),
					},
				});
			});
			return res.status(200).json({
				status: "success",
				data: prams,
			});
		} else {
			result = await getItems(filter);
			const items: MeetUpType[] = [];
			result?.forEach((i: MeetUpType) => {
				items.push({ ...i, id: i._id });
			});
			return res.status(200).json({
				status: "success",
				data: items,
			});
		}
	} catch (err: any) {
		console.log(err);
		return error(500, err.message, res);
	}
};
const asyncPost = async (req: NextApiRequest, res: NextApiResponse) => {
	const item = req.body;
	if (!item) {
		return error(400, "Invalid Input Data", res);
	}

	try {
		const result = await insertItem(item);
		return res.status(201).json({
			status: "success",
			data: {
				...result,
				...item,
			},
			message: `${item.title} Item is Saved.`,
		});
	} catch (err: any) {
		return error(500, err.message, res);
	}
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			console.log(req.query.id);
			return asyncGet(req, res);
		case "POST":
			return asyncPost(req, res);
	}
};
export default handler;
