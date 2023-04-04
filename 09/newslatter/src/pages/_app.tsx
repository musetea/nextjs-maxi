import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import Notification from "@/components/notification";
import { NotiStatusType } from "@/core/type";
import { NotificationProps } from "@/core/interfaces";
import NotificationProvider from "../store/notification-provider";

const noti: NotificationProps = {
	title: "Test",
	message: "This is Notification occuss",
	status: NotiStatusType.pending,
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<NotificationProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</NotificationProvider>
		</>
	);
}
