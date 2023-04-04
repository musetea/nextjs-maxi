import { FC, useContext } from "react";
import { ChildProps } from "@/core/interfaces";
import MainHeader from "./MainHeader";
import NotificationContext from "@/store/notification-context";
import Notification from "../notification";
import { NotiStatusType } from "@/core/type";
const Layout: FC<ChildProps> = ({ children }) => {
	const notiCtx = useContext(NotificationContext);

	const notification = notiCtx.noti ? (
		notiCtx.noti.status !== NotiStatusType.none ? (
			<Notification
				title={notiCtx.noti.title}
				message={notiCtx.noti.message}
				status={notiCtx.noti.status}
			/>
		) : null
	) : null;

	return (
		<div className="layout">
			<MainHeader />
			{children}
			{notification}
		</div>
	);
};
export default Layout;
