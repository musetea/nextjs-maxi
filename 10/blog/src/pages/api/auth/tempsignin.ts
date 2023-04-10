import type { NextApiRequest, NextApiResponse } from "next";

import { MogoDBResults, HttpResults } from "../../../core";
import { SignInType } from "@/core/auth";
import { signIn } from "@/db/mongo";

/**
 * 인증확인
 * 토큰발행
 * @param auth
 * @param res
 * @returns
 */
const asyncPost = async (
	auth: SignInType,
	res: NextApiResponse<HttpResults<SignInType>>
) => {
	const result = await signIn(auth);
	if (!result) {
		res.status(401).json({
			status: "fail",
			message: `user sign in values invalid`,
		});
		return;
	}

	return res.status(200).json({
		status: "success",
	});
};

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<HttpResults<SignInType>>
) => {
	if (req.method === "POST") {
		const auth: SignInType = req.body;
		return await asyncPost(auth, res);
	}
};

export default handler;
