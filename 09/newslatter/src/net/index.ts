import { EventType } from "@/core/type";
const DOMAIN = "http://localhost:3001";

export const getFeaturedEvents = async <T>() => {
	const url = encodeURI(`${DOMAIN}/events?featured='false'`);
	const res = await fetch(url);
	const result = (await res.json()) as T;
	return result;
};

export const GetAllEvents = async <T>() => {
	const url = encodeURI(`${DOMAIN}/events/`);
	const res = await fetch(url);
	const result = (await res.json()) as T;
	return result;
};

export const GetEventIdList = async <T>() => {
	const url = encodeURI(`${DOMAIN}/events/id`);
	const res = await fetch(url);
	const result = (await res.json()) as T;
	return result;
};

export const GetEvent = async <T>(id: string) => {
	const url = encodeURI(`${DOMAIN}/events/${id}`);
	const res = await fetch(url);
	const result = (await res.json()) as T;
	console.log("net:GetEvent()", result);
	return result;
};

export const GetFilterEvents = async <T>(path: string) => {
	const url = encodeURI(`${DOMAIN}/${path}`);
	const res = await fetch(url);
	const result = (await res.json()) as T;
	console.log("net:GetFilterEvents()", result);
	return result;
};

export const getDomain = () => DOMAIN;
