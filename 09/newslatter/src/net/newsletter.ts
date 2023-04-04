import { Results } from "@/core/interfaces";
import { getDomain } from "../net/index";
const domain = getDomain();
const path = "newsletter";

const headers = {
	"Content-Type": "application/json",
};

export const createNewsLetter = async <T>(email: T) => {
	const url = encodeURI(`${domain}/${path}`);
	console.log(url, email);
	const res = await fetch(url, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(email),
	});
	const result = (await res.json()) as T;
	console.log("newsletter:createNewsLetter()", result);
	return result;
};

export const getNewsLetter = async <T>() => {
	const url = encodeURI(`${domain}/${path}`);
	const res = await fetch(url);
	const result = (await res.json()) as T;
	console.log("newsletter:getNewsLetter()", result);
	return result;
};
