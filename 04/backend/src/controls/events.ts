import { Request, Response, NextFunction } from "express";
import { Connection, FieldPacket, RowDataPacket } from "mysql2/promise";
import getConnection, { getQuery, getScalarQuery } from "../db/mysql";

interface EventType extends RowDataPacket {
	id: string;
	title: string;
	description: string;
	location: string;
	date: string;
	image: string;
	isFeatured: boolean;
}

export const checkEventId = (
	req: Request,
	res: Response,
	next: NextFunction,
	value: any
) => {
	const eventId = value;
	if (!eventId) {
		return res.status(400).json({
			status: "fail",
			message: `event id invalid ${eventId}`,
		});
	}
	next();
};

export const getAllEvents = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.query);
	const isQuery = req.query ? true : false;
	try {
		let q = "SELECT * FROM nj_events";
		if (isQuery) {
			const isFeatured = req.query.featured == "true" ? 1 : 0;
			q += ` where isFeatured=${isFeatured};`;
		} else {
			q += ";";
		}
		const datas = await getQuery<EventType[]>(q);
		//console.log(datas);
		return res.status(200).json({
			status: "success",
			data: {
				events: datas,
			},
		});
	} catch (err: any) {
		return res.json({
			status: "fail",
			message: `getQuery(): ${err.message}`,
		});
	}
};

export const getEvent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const eventId = req.params.id;

	try {
		const q = `SELECT * FROM nj_events where id = '${eventId}'`;
		const datas = await getScalarQuery<EventType>(q);
		console.log(typeof datas);
		return res.status(200).json({
			status: "success",
			data: {
				events: datas,
			},
		});
	} catch (err: any) {
		return res.json({
			status: "fail",
			message: `getQuery(): ${err.message}`,
		});
	}
};

export const getEventIdList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const q = `SELECT id FROM nj_events`;
		const datas = await getQuery<EventType>(q);
		return res.status(200).json({
			status: "success",
			data: {
				ids: datas,
			},
		});
	} catch (err: any) {
		return res.json({
			status: "fail",
			message: `getQuery(): ${err.message}`,
		});
	}
};

export const getFilterEvents = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req.params);
	const { year, month } = req.params;

	let q = "select * from nj_events where date_format(`date`,'%Y-%c')";
	q += `= '${year}-${month}' ;`;
	console.log(q);
	try {
		const datas = await getQuery<EventType[]>(q);
		console.log(datas);
		return res.status(200).json({
			status: "success",
			data: {
				events: datas,
			},
		});
	} catch (err: any) {
		return res.json({
			status: "fail",
			message: `getQuery(): ${err.message}`,
		});
	}
};
