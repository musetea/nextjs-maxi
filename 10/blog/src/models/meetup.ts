import { Collection, MongoClient, MongoServerError, ObjectId } from "mongodb";
import { getClient, getCollection } from "@/db/mongo";
export type MeetUpType = {
	id: string | ObjectId;
	title: string;
	image: string;
	address: string;
	description: string;
};

export const insertItem = async <T>(item: T) => {
	const cli = await getClient();
	try {
		const collection = await getCollection<T>(cli, "blogs", "meetup");
		//console.log(collection);
		const result = await collection.insertOne(item);
		return result;
	} catch (error) {
		console.error(error);
		if (error instanceof MongoServerError) {
			console.log(`Error worth logging: ${error}`); // special case for some reason
		}
		throw error; // still want to crash
	} finally {
		await cli.close();
	}
};

export const getItem = async <T>(filter: T) => {
	console.log("getItem");
	const client = await getClient();
	try {
		const collection = client.db("blogs").collection("meetup");
		const item = await collection.findOne(filter);
		console.log("getItem:", filter, item);
		return item;
	} catch (err) {
		console.error(err);
		return null;
	} finally {
		client.close();
	}
};
/**
 * .toArray() find 시 배열로 반환
 */
export const getItems = async <T, P>(filter: T, projection?: P) => {
	const client = await getClient();
	try {
		const collection = await client.db("blogs").collection("meetup");
		const items = await collection.find(filter, projection).toArray();
		//console.log("getItems:", items);
		return items;
	} catch (err) {
		console.error(err);
		return null;
	} finally {
		client.close();
	}
};
