/**
 *
 */
export interface HttpResults<T> {
	status: "success" | "fail";
	message?: any;
	data?: T;
}

export interface MogoDBResults<T> {
	status: "success" | "fail";
	data: T;
}
