import { NextApiRequest, NextApiResponse } from "next";
import { createNewsLetter, getNewsLetter } from "@/net/newsletter";
import { Results } from "@/core/interfaces";
import { NewsLetterType } from "../../core/type";
import { connectionMongo } from "@/db/mongo";

const asyncPost = async (email: string, res: NextApiResponse) => {
	const userEmail = email;
	console.log(userEmail);
	if (!userEmail || !userEmail.includes("@")) {
		res.status(422).json({
			status: "fail",
			messge: "Invalid email address!!!" + ` [${userEmail}]`,
		});
	}

	// 서버단처리
	const client = await connectionMongo();
	const collection = client.db("events").collection("newsletter");
	const emailObj = {
		email: userEmail,
	};
	//const result = await createNewsLetter(emailObj);
	const result = await collection.insertOne(emailObj);
	console.log(result);
	client.close();

	return res.status(201).json({
		status: "success",
		data: emailObj,
	});
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const userEmail = req.body.email;
		// console.log(userEmail);
		// if (!userEmail || !userEmail.includes("@")) {
		// 	res.status(422).json({
		// 		status: "fail",
		// 		messge: "Invalid email address!!!" + ` [${userEmail}]`,
		// 	});
		// }

		// // 서버단처리
		// const emailObj = {
		// 	email: userEmail,
		// };
		// console.log("서버단처리", emailObj);
		// const result = await createNewsLetter(emailObj);
		// console.log(result);

		await asyncPost(userEmail, res);

		// return res.status(201).json({
		// 	status: "success",
		// 	data: emailObj,
		// });
	} else if (req.method === "GET") {
		const result = await getNewsLetter<NewsLetterType[]>();
		console.log(result);
	}
};
export default handler;
