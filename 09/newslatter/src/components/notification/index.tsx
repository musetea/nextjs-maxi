import { FC, useContext, useEffect } from "react";
import classes from "./notification.module.scss";
import notiContext from "@/store/notification-context";
import { NotificationProps } from "../../core/interfaces";
import { NotiStatusType } from "@/core/type";

const Notification: FC<NotificationProps> = props => {
	const { title, message, status } = props;
	const notiCtx = useContext(notiContext);

	let statusCls = "";
	switch (status) {
		case NotiStatusType.success:
			statusCls = classes.success;
			break;
		case NotiStatusType.error:
			statusCls = classes.error;
			break;
		case NotiStatusType.pending:
			statusCls = classes.pending;
			break;
	}

	const cls = `${classes.notification} ${statusCls}`;
	return (
		<div className={cls} onClick={notiCtx.hide}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
};
export default Notification;
