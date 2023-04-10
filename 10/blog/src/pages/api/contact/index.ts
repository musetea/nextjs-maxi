import type { NextApiRequest, NextApiResponse } from "next";
import { HttpResults } from "../../../core/index";
import type { ContactType } from "../../../core/contract";
import { insertItem } from "@/db/mongo";

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<HttpResults<ContactType>>
) => {
	switch (req.method) {
		case "POST":
			const contact = req.body;
			return await asyncPost(contact, res);
	}
};

export default handler;

const asyncPost = async (
	contact: ContactType,
	res: NextApiResponse<HttpResults<ContactType>>
) => {
	try {
		const now = Date.now();
		const data: ContactType = {
			...contact,
			createAt: new Date(),
		};
		const result = await insertItem<ContactType>(data);

		res.status(201).json({
			status: "success",
			data: {
				...result,
				...data,
			},
			message: `Contact is Successful.`,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err,
		});
	}
};
