import type { NextApiRequest, NextApiResponse } from "next";

import { MogoDBResults, HttpResults } from "../../../core";
import { SignUpType } from "@/core/auth";
import { signUp } from "@/db/mongo";
import { ObjectId } from "bson";
import { authOptions } from "./[...nextauth]";
import { getServerSession } from "next-auth/next";

//SignUpType & { insertedId: ObjectId }
const asyncPost = async (
	auth: SignUpType,
	res: NextApiResponse<HttpResults<any>>
) => {
	try {
		// 몽고 DB에 데이터 삽입
		const result = await signUp(auth);
		//console.log(result);
		if (result.status === "success") {
			return res.status(201).json({
				status: "success",
				data: {
					...auth,
					...result,
				},
			});
		} else {
			res.status(422).json({
				status: "fail",
				message: result.message,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err,
		});
	}
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<HttpResults<SignUpType>>
) => {
	const session = await getServerSession(req, res, authOptions);
	console.log(session);

	switch (req.method) {
		case "POST":
			// 검증
			const auth: SignUpType = req.body;
			return await asyncPost(auth, res);
	}
};
export default handler;
