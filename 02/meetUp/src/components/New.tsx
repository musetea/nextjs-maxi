import React from "react";
import { useRef } from "react";
import Card from "./Card";
import classes from "./components.module.scss";

interface NewFormProps {
	addMeetup: (
		title: string,
		image: string,
		address: string,
		description: string
	) => void;
}

const NewMeetUpForm: React.FC<NewFormProps> = ({ addMeetup }) => {
	const refTitle = useRef<HTMLInputElement>(null);
	const refImage = useRef<HTMLInputElement>(null);
	const refAddress = useRef<HTMLInputElement>(null);
	const refDescription = useRef<HTMLTextAreaElement>(null);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const title = refTitle.current!.value;
		const image = refImage.current!.value;
		const address = refAddress.current!.value;
		const description = refDescription.current!.value;

		addMeetup(title, image, address, description);
	};

	return (
		<Card>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="title">Title</label>
					<input ref={refTitle} required type="text" name="title" id="title" />
				</div>
				<div className={classes.control}>
					<label htmlFor="image">Picture</label>
					<input ref={refImage} required type="url" name="image" id="image" />
				</div>
				<div className={classes.control}>
					<label htmlFor="address">Address</label>
					<input
						ref={refAddress}
						required
						type="address"
						name="address"
						id="address"
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="description">Description</label>
					<textarea
						required
						name="description"
						id="description"
						cols={30}
						rows={10}
						ref={refDescription}
					></textarea>
				</div>
				<div className={classes.actions}>
					<button type="submit">Add Meetup</button>
				</div>
			</form>
		</Card>
	);
};
export default NewMeetUpForm;
