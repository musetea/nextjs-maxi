import { createPool, Pool, PoolOptions } from "mysql2/promise";
import { ResultSetHeader } from "mysql2";

const poolOptions: PoolOptions = {
	host: process.env.DATABASE_HOST!,
	user: process.env.DATABASE_USER!,
	password: process.env.DATABASE_PASSWORD!,
	database: process.env.DATABASE_SCHMA!,
	port: Number(process.env.DATABASE_PORT!),
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true, // false by default.
};

const getPool = (options: PoolOptions = poolOptions) => {
	const pool = createPool(options);
	return pool;
};

export const excuteQuery = async <T>(q: string) => {
	const pool = getPool();

	const [rows, fields] = await pool.execute(q);
	const result = rows as ResultSetHeader;
	return result;
};
export const getQuery = async <T>(q: string) => {
	const pool = getPool();

	const conn = await pool.getConnection();
	const [rows, fields] = await conn.query(q);
	conn.release();
	return rows;
};
