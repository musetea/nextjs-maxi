import { ReactNode } from "react";
import {
	NewCommentType,
	EventType,
	NotiStatusType,
	HttpNotificationType,
} from "./type";

export interface ChildProps {
	children: ReactNode;
}

export interface ButtonProps extends ChildProps {
	onClick?: () => void;
}

export interface LinkButtonProps extends ButtonProps {
	link: string;
}

export interface InputBoxProps {
	caption: string;
	id: string;
	type: string;
}

export interface NewCommentProps {
	addComment: (comment: NewCommentType, onReset: () => void) => void;
}

export interface EventListProps {
	events: EventType[];
}

export interface EventItemProps {
	event: EventType;
}

export interface Results<T> {
	status: "success" | "fail";
	data?: T;
	message?: string;
}

export interface NotificationProps {
	title: string;
	message: string;
	status: NotiStatusType;
}

export interface HttpNotificationContext {
	noti?: HttpNotificationType;
	show: (noti: HttpNotificationType) => void;
	hide: () => void;
}
