import { createConnection, Connection } from "mysql2/promise";
import { createPool, Pool, PoolOptions, ResultSetHeader } from "mysql2/promise";
import { config } from "dotenv";

config();

const poolOptions: PoolOptions = {
	host: "localhost",
	user: "root",
	password: "13151315",
	database: "udemy",
	port: 3306,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
};

//console.log(process.env);
function test(arg: string): Promise<number> {
	return new Promise<number>((resolve, reject) => {
		if (arg === "a") {
			resolve(1);
		} else {
			reject("1");
		}
	});
}

const getConnection = (): Promise<Connection> => {
	return new Promise<Connection>(async (resolve, reject) => {
		try {
			const connection = createConnection({
				user: "root",
				password: "13151315",
				host: "127.0.0.1",
				port: 3306,
				database: "udemy",
			});
			resolve(connection);
		} catch (err) {
			reject(err);
		}
	});
};
const getPool = (options: PoolOptions = poolOptions) => {
	const pool = createPool(options);
	return pool;
};

export const getQuery = async <T>(q: string) => {
	const pool = getPool();

	const [rows, fields] = await pool.query(q);
	console.log(rows);
	//console.log(fields);

	const datas = rows;
	return datas;
};
export const getScalarQuery = async <T>(q: string) => {
	const pool = getPool();
	const [rows, fields] = await pool.query(q);
	//console.log(rows);
	//console.log(fields);

	const datas = rows;
	return datas;
};

export const excuteQuery = async <T>(q: string) => {
	const pool = getPool();

	const [rows, fields] = await pool.execute(q);
	const result = rows as ResultSetHeader;
	console.log(result.affectedRows);
	//console.log(fields);
	return result;
};

export default getConnection;
