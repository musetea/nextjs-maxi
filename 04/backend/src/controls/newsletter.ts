import { Request, Response, NextFunction } from "express";
import { ResultSetHeader } from "mysql2/promise";
import { excuteQuery, getQuery } from "../db/mysql";

export const createNewsLetter = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const jsonBody = req.body;
	const { email } = jsonBody;
	console.log(req.body);
	if (!email || !email.includes("@")) {
		return res.status(422).json({
			status: "fail",
			message: `Invlidate Email Address`,
		});
	}
	const now = new Date().toISOString();
	const q = `insert into news_letters(email,dt) Values('${email}','${now}');`;

	const ResultSetHeader = (await excuteQuery(q)) as ResultSetHeader;
	res.status(201).json({
		status: "success",
		data: {
			...ResultSetHeader,
		},
	});
};

export const getNewsLetter = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const q = `select * from news_letters;`;
	const datas = await getQuery<{ email: string; dt: string }[]>(q);
	return res.status(200).json({
		status: "success",
		data: {
			events: datas,
		},
	});
};
