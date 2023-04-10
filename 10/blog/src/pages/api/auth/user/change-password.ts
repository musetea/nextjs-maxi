import type { NextApiRequest, NextApiResponse } from "next";
import { HttpResults } from "@/core";
import { authOptions } from "../[...nextauth]";
import { getServerSession } from "next-auth/next";
import { getItem, updateItem } from "@/db/mongo";
import { checkHashPassword, getHash } from "@/lib/crypt";
import { ObjectId, UpdateResult } from "mongodb";

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<HttpResults<Partial<UpdateResult>>>
) => {
	//const session = await getServerSession(req, res, authOptions);
	//console.log(session);

	if (req.method === "PATCH") {
		try {
			console.log(req.body);
			const { newPassword, oldPassword } = req.body;

			const session = (await getServerSession(req, res, authOptions)) as any;
			console.log("getServerSession()", session);
			if (!session) {
				res.status(401).json({
					status: "fail",
					message: "You must be logged in.",
				});
				return;
			}
			// { email: 'test@gmail.com', iat: 1681008126 }
			const userEmail = session.email as string;
			// find user for email
			const user = (await getItem({
				email: userEmail,
			})) as any;
			if (!user) {
				res.status(401).json({
					status: "fail",
					message: "Not found User.",
				});
				return;
			}
			// 비밀번호 검증 (기존비밀번호 체크 )
			const isCheck = await checkHashPassword(oldPassword, user.password);
			if (!isCheck) {
				res.status(403).json({
					status: "fail",
					message: "Invalid Password",
				});
				return;
			}

			// 새로운 비밀번호 업데이트
			const hashNewPassword = await getHash(newPassword);
			const filter = {
				_id: user._id,
			};
			const item = {
				$set: {
					password: hashNewPassword,
				},
			};
			const reuslt = await updateItem(filter, item);

			// updateItem: { _id: new ObjectId("642fda8a552613a02f503523") } {
			//     acknowledged: true,
			//     modifiedCount: 1,
			//     upsertedId: null,
			//     upsertedCount: 0,
			//     matchedCount: 1
			//   }
			res.status(200).json({
				status: "success",
				data: reuslt as UpdateResult,
			});
		} catch (err) {
			console.error(err);
			res.status(500).json({
				status: "fail",
				message: err,
			});
		}
	}
};

export default handler;
