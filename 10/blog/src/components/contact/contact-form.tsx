import React, { FC, useRef } from "react";
import classes from "../../styles/contact/contact-form.module.scss";
import { ContactType } from "../../core/contract";

interface ContactFormProps {
	onSubmit: (contract: ContactType, reset: () => void) => void;
}

const ContactForm: FC<ContactFormProps> = props => {
	const { onSubmit } = props;
	const emailRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const msgRef = useRef<HTMLTextAreaElement>(null);

	const onResetHandler = () => {
		emailRef.current!.value = "";
		nameRef.current!.value = "";
		msgRef.current!.value = "";

		console.log("contact input control value reset!!!");
	};

	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const email = emailRef.current!.value;
		const name = nameRef.current!.value;
		const msg = msgRef.current!.value;

		// validate check

		const contact: ContactType = {
			email: email,
			name: name,
			message: msg,
		};
		onSubmit(contact, onResetHandler);
	};

	return (
		<section className={classes.contact}>
			<form className={classes.form} onSubmit={onSubmitHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							ref={emailRef}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" required ref={nameRef} />
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor="message">Message</label>
					<textarea
						name="message"
						id="message"
						cols={30}
						rows={10}
						ref={msgRef}
					></textarea>
				</div>
				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
		</section>
	);
};
export default ContactForm;
