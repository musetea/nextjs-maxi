import { Collection, MongoClient, MongoServerError, ObjectId } from "mongodb";
import { getHash, checkHashPassword } from "@/lib/crypt";
import { SignInType, SignUpType } from "@/core/auth";
import { MogoDBResults } from "../core/index";

const mongodb = process.env.MONGO_DB;

const url = mongodb || "mongodb://localhost:27017";

export const getClient = async () => {
	const client = new MongoClient(url);
	const connection = await client.connect();
	return connection;
};

export const getCollection = async <T>(
	cli: MongoClient,
	dbName: string,
	collectionName: string
) => {
	const db = cli.db(dbName);
	const collection = db.collection(collectionName);
	return collection;
};

export const insertItem = async <T>(item: T) => {
	const cli = await getClient();
	try {
		const collection = await getCollection<T>(cli, "blogs", "contacts");
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
	const client = await getClient();
	try {
		const collection = await client.db("blogs").collection("auth");
		const user = await collection.findOne(filter);
		console.log("getItem:", filter, user);
		return user;
	} catch (err) {
		console.error(err);
		return null;
	} finally {
		client.close();
	}
};
export const updateItem = async (filter: any, item: any) => {
	const client = await getClient();
	try {
		const collection = await client.db("blogs").collection("auth");
		const result = await collection.updateOne(filter, item);
		console.log("updateItem:", filter, result);
		return result;
	} catch (err) {
		console.error(err);
		return null;
	} finally {
		client.close();
	}
};
/**
 * 이메일 존재여부  TRUE | FALSE
 */
const checkEmail = async <T>(collection: Collection, email: string) => {
	const result = await collection.findOne<T & { _id: ObjectId }>({
		email: email,
	});
	return result !== null ? true : false;
};

/**
 * 1) 입력정보체크 (이메일, 패스워드)
 * 2) 이메일 가입여부 체크
 * @param auth
 * @returns
 */
export const signUp = async (auth: SignUpType) => {
	const cli = await getClient();
	const { email, password } = auth;
	try {
		const collection = await getCollection<SignUpType>(cli, "blogs", "auth");

		// 2) 가입여부체크
		if ((await checkEmail(collection, email)) === true) {
			return {
				status: "fail",
				message: `${email} 존재하는 이메일, 이메일 체크`,
			};
		}

		const hashPassword = await getHash(password);
		const result = await collection.insertOne({
			email: email,
			password: hashPassword,
		});
		//console.log("signUp:", result);
		return {
			status: "success",
			data: {
				...result,
			},
		};
	} catch (err) {
		console.error(err);
		if (err instanceof MongoServerError) {
			console.log(`Error worth logging: ${err}`); // special case for some reason
		}
		throw err; // still want to crash
	} finally {
		await cli.close();
	}
};

export const signIn = async (auth: SignInType) => {
	const cli = await getClient();
	try {
		const collection = await getCollection<SignInType>(cli, "blogs", "auth");
		const result = await collection.findOne<SignInType & { _id: ObjectId }>({
			email: auth.email,
		});
		if (!result) {
			console.log("error", result);
		}
		// 비밀번호 체크
		//console.log(result);
		const hashPass = result!.password;
		const checkPass = await checkHashPassword(auth.password, hashPass);
		return checkPass;
	} catch (err) {
		console.error(err);
		if (err instanceof MongoServerError) {
			console.log(`Error worth logging: ${err}`); // special case for some reason
		}
		throw err; // still want to crash}
	}
};
