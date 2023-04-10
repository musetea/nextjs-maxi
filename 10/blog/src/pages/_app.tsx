import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Layout from "@/components/layout";
import NotifycationContext from "@/store/notification-context";
import { NotifycationType, NotifycationStatusType } from "@/core/notifycation";
import { useState } from "react";
import Notifycation from "../components/ui/notifycation";

const initalizeNotifycation: NotifycationType = {
	status: NotifycationStatusType.none,
	title: "",
	message: "",
};

export default function App({ Component, pageProps }: AppProps) {
	//const target = document.getElementById("notifications")! as HTMLDivElement;
	// console.log(target);
	const [alarm, setAlarm] = useState<NotifycationType>(initalizeNotifycation);

	const showHandler = (noti: NotifycationType) => {
		setAlarm(noti);
	};
	const hideHandler = () => {
		setAlarm(initalizeNotifycation);
	};
	// const onNotifycatoinClose = () => {};

	const context = {
		notifycation: alarm,
		show: showHandler,
		hide: hideHandler,
	};

	return (
		<SessionProvider session={pageProps.session}>
			<NotifycationContext.Provider value={context}>
				<Layout>
					<Head>
						{/* <title>{""}</title> */}
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
					</Head>
					<Component {...pageProps} />
					{alarm && alarm.status !== NotifycationStatusType.none && (
						<Notifycation notification={alarm} onClose={hideHandler} />
					)}
				</Layout>
			</NotifycationContext.Provider>
		</SessionProvider>
	);
}
