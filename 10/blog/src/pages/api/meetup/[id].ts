import type { NextApiRequest, NextApiResponse } from "next";
import { getItem } from "@/models/meetup";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			const id = req.query.id as string;
			if (!id) {
				res.status(400).json({
					status: "fail",
					message: "invalid request params",
				});
				return;
			}
			var o_id = new ObjectId(id);
			const filter = {
				_id: o_id,
			};
			const result = await getItem(filter);
			console.log(result);
			return res.status(200).json({
				status: "success",
				data: {
					...result,
					id: result?._id,
				},
			});
	}
};
export default handler;
