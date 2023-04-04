export type CommentType = {
	eventId: string;
	commentId: string;
	date: string;
	commender: string;
	commentMsg: string;
};

export type NewCommentType = {
	email: string;
	name: string;
	comment: string;
};

export type EventType = {
	id: string;
	title: string;
	image: string;
	date: string;
	location: string;
	description: string;
};

export enum IconType {
	DATE,
	ADDRESS,
}

export type NewsLetterType = {
	email: string;
	dt: string;
};

export enum NotiStatusType {
	none,
	success,
	error,
	pending,
}
export type HttpNotificationType = {
	title: string;
	message: string;
	status: NotiStatusType;
};
