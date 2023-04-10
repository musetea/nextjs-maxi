import { FC, useState } from "react";
import Head from "next/head";

import { ContactType } from "@/core/contract";
import ContactForm from "../../components/contact/contact-form";
import {
	NotifycationStatusType,
	NotifycationType,
} from "../../core/notifycation";
import Notifycation from "@/components/ui/notifycation";
import { HttpResults } from "@/core";
import { useContext } from "react";
import NotifycationContext from "@/store/notification-context";

const ContactPage: FC = props => {
	const [notification, setNotifycatoin] = useState<NotifycationType>();
	const notiCtx = useContext(NotifycationContext);

	const onContactHandler = async (contact: ContactType, reset: () => void) => {
		console.log(contact);
		const result = (await fatchPost(contact)) as HttpResults<NotifycationType>;
		//console.log(result);
		// setNotifycatoin();
		notiCtx.show({
			status: getResultType(result.status),
			title: "Add Contact",
			message: result.message,
		});
		reset();
	};

	const getResultType = (result: string) => {
		let status: NotifycationStatusType = NotifycationStatusType.none;
		switch (result) {
			case "fail":
				status = NotifycationStatusType.error;
				break;
			case "success":
				status = NotifycationStatusType.success;
				break;
		}
		console.log(status);
		return status;
	};

	const onNotificatoinClose = () => {
		setNotifycatoin(undefined);
	};

	return (
		<>
			<Head>
				<title>{"Contact Me"}</title>
			</Head>
			<h1 style={{ textAlign: "center" }}>How can I help you?</h1>
			<ContactForm onSubmit={onContactHandler} />
			{/* {notification && (
				<Notifycation
					notification={notification}
					onClose={onNotificatoinClose}
				/>
			)} */}
		</>
	);
};
export default ContactPage;

const fatchPost = async (contact: ContactType) => {
	try {
		const res = await fetch(`/api/contact`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(contact),
		});
		const result = await res.json();
		return result;
	} catch (err) {
		console.error(err);
		return {
			status: "fail",
			message: err,
		};
	}
};
