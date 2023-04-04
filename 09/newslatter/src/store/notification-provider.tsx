import NotificationContext from "./notification-context";
import { FC, useState, useEffect } from "react";
import { ChildProps, HttpNotificationContext } from "@/core/interfaces";
import { HttpNotificationType, NotiStatusType } from "@/core/type";

const initializeNoti: HttpNotificationType = {
	title: "",
	message: "",
	status: NotiStatusType.none,
};

const NotificationProvider: FC<ChildProps> = ({ children }) => {
	const [activeNoti, setActiveNoti] =
		useState<HttpNotificationType>(initializeNoti);

	useEffect(() => {
		if (activeNoti) {
			if (
				activeNoti.status === NotiStatusType.success ||
				activeNoti.status === NotiStatusType.error
			) {
				const timer = setTimeout(() => {
					setActiveNoti(initializeNoti);

					return () => {
						clearTimeout(timer);
					};
				}, 3000);
			}
		}
	}, [activeNoti]);

	const hideHandler = () => {
		setActiveNoti(initializeNoti);
	};
	const showHandler = (noti: HttpNotificationType) => {
		setActiveNoti(noti);
	};

	const context: HttpNotificationContext = {
		noti: activeNoti,
		show: showHandler,
		hide: hideHandler,
	};

	return (
		<NotificationContext.Provider value={context}>
			{children}
		</NotificationContext.Provider>
	);
};
export default NotificationProvider;
