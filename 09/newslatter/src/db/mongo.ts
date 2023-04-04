// import { MongoClient } from "mongodb";
import { MongoClient } from "mongodb";
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGO_HOST!;
console.log(url);
const client = new MongoClient(url);
client
	.connect()
	.then(console.log)
	.catch(err => console.error(err));

export const connectionMongo = async () => {
	try {
		await client.connect();
		console.log("Connected successfully to server");
		//const db = client.db("events");
		//const collection = db.collection(collName);
		return client;
	} catch (err: any) {
		throw new Error(err.message);
	}
};
