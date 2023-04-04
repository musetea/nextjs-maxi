import { createContext } from "react";
import { HttpNotificationType, NotiStatusType } from "../core/type";
import { HttpNotificationContext } from "../core/interfaces";

const initailizeNoti: HttpNotificationType = {
	title: "",
	message: "",
	status: NotiStatusType.none,
};

const defaultValue: HttpNotificationContext = {
	notification: initailizeNoti,
	visible: (show: boolean) => {},
};

const NotificationContext = createContext(defaultValue);

export default NotificationContext;
