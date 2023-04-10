import { createContext, FC, ReactNode, useState, useEffect } from "react";
import { NotifycationStatusType, NotifycationType } from "../core/notifycation";
import Notifycation from "../components/ui/notifycation";

const notiType: NotifycationType = {
	status: NotifycationStatusType.none,
	title: "",
	message: "",
};

const defaultValue = {
	notifycation: notiType,
	show: (noti: NotifycationType) => {},
	hide: () => {},
};
const NotifycationContext = createContext(defaultValue);

// const NotificationProvier: FC<{
// 	children: ReactNode;
// 	// target: HTMLDivElement;
// }> = ({ children }) => {
// 	const [alarm, setAlarm] = useState<NotifycationType>(notiType);
// 	// console.log(target);
// 	useEffect(() => {
// 		if (alarm.status === NotifycationStatusType.none) {
// 			return;
// 		}

// 		const timer = setTimeout(() => {
// 			setAlarm(notiType);

// 			return () => {
// 				clearTimeout(timer);
// 			};
// 		}, 3000);
// 	}, [alarm]);

// 	const showHandler = (noti: NotifycationType) => {
// 		setAlarm(noti);
// 	};
// 	const hideHandler = () => {
// 		setAlarm(notiType);
// 	};

// 	const context = {
// 		notification: alarm,
// 		show: showHandler,
// 		hide: hideHandler,
// 	};

// 	return (
// 		<NotifycationContext.Provider value={context}>
// 			{children}
// 			{
// 				<Notifycation
// 					// target={target}
// 					notification={alarm}
// 					onClose={hideHandler}
// 				/>
// 			}
// 		</NotifycationContext.Provider>
// 	);
// };
export default NotifycationContext;
