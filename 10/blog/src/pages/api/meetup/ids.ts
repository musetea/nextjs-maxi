import type { NextApiRequest, NextApiResponse } from "next";
import { getItem } from "@/models/meetup";
import { getClient } from "@/db/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			//console.log("특정필드만 ");
			const cli = await getClient();
			const collection = await cli.db("blogs").collection("meetup");

			const projection = {
				_id: 1,
			};
			const result = await collection.find({}, { projection }).toArray();
			//console.log(result);
			const prams = [];
			result.forEach(i => {
				prams.push({
					params: {
						id: i._id.toString(),
					},
				});
			});
			//console.log(prams);
			return res.status(200).json({
				status: "success",
				data: prams,
			});
	}
};
export default handler;
