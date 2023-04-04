import { NextApiRequest, NextApiResponse } from "next";
import { excuteQuery, getQuery } from "@/db/mysql";
import { connectionMongo } from "../../../db/mongo";
import short from "short-uuid";
import { CommentType } from "@/core/type";

const asyncGet = async (eventId: string, res: NextApiResponse) => {
	const q = `select * from nj_comments where eventId='${eventId}';`;
	const results = await getQuery<CommentType[]>(q);
	// console.log("asyncGet() ", results);

	res.status(200).json({
		status: "success",
		data: {
			comments: results,
		},
	});
};

const asyncGetMongo = async (eventId: string, res: NextApiResponse) => {
	let client;
	try {
		client = await connectionMongo();
		const collection = client.db("events").collection("comments");
		const comments = await collection
			.find({ eventId: eventId })
			.sort({ _id: -1 })
			.toArray();
		//console.log(comments);

		res.status(200).json({
			status: "success",
			data: {
				comments,
			},
		});
	} catch (err: any) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	} finally {
		client?.close();
	}
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const eventId = req.query.id as string;
	if (!eventId) {
		return res.status(400).json({
			status: "fail",
			message: "Invlid Event ID",
		});
	}

	switch (req.method) {
		case "GET":
			// asyncGet(eventId, res);
			return asyncGetMongo(eventId, res);

		case "POST":
			const body = req.body;
			const { email, name, comment } = body;
			console.log(email, name, comment);
			const commentId = short.generate();
			const now = new Date().toISOString();
			const commentObj: CommentType = {
				eventId,
				commentId,
				date: now,
				commender: name,
				commentMsg: comment,
			};

			const client = await connectionMongo();
			const collection = client.db("events").collection("comments");
			const result = await collection.insertOne(commentObj);
			console.log(result);

			client.close();
			return res.status(201).json({
				status: "success",
				data: {
					result,
				},
			});
			break;
	}
};

export default handler;

const asyncPostMysql = async (
	commentObj: CommentType,
	res: NextApiResponse
) => {
	const { eventId, commentId, date, commender, commentMsg } = commentObj;
	const q = `insert into nj_comments(eventId, commentId,dt,commender, commentMsg) 
        values('${eventId}','${commentId}', '${date}', '${commender}', '${commentMsg}');`;

	const result = await excuteQuery(q);
	console.log(result);
	/**
     * ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
    }
     */

	if (result.affectedRows <= 0) {
		return res.status(500).json({
			status: "fail",
			message: `insert fail`,
		});
	} else {
		return res.status(210).json({
			status: "success",
			data: commentObj,
		});
	}
};
