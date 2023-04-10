import { createPortal } from "react-dom";
import { FC, useEffect } from "react";
import {
	NotifycationStatusType,
	NotifycationType,
} from "../../core/notifycation";
import classes from "../../styles/notifycation/notifycation.module.scss";

interface NotifycationProps {
	// target?: HTMLDivElement;
	notification: NotifycationType;
	onClose: () => void;
}

const Notifycation: FC<NotifycationProps> = props => {
	const { onClose } = props;
	const { status, title, message } = props.notification;

	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const cls = `${classes.notifycation} ${
		status === NotifycationStatusType.success
			? classes.success
			: status === NotifycationStatusType.error
			? classes.error
			: classes.pendng
	}`;

	const notifycationDom = (
		<article className={cls} onClick={onClose}>
			<h2>{title}</h2>
			<p>{message}</p>
		</article>
	);
	// const target = document.getElementById("notifications")! as HTMLDivElement;
	// console.log(target);

	return <>{notifycationDom}</>;

	// return createPortal(
	// 	<article className={cls} onClick={onClose}>
	// 		<h2>{title}</h2>
	// 		<p>{message}</p>
	// 	</article>,
	// 	document.getElementById("notifications")! as HTMLDivElement
	// );
};

export default Notifycation;
