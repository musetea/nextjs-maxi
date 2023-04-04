// import { redirect } from "react-router-dom";
import { useNavigate } from "react-router";
import NewMeetUpForm from "../components/New";
import { v4 as GeneralID } from "uuid";
import { MeetUpType } from "./Home";

const NewMeetUpPage = () => {
	const navigator = useNavigate();
	const onAddMeetupHandler = async (
		title: string,
		image: string,
		address: string,
		description: string
	) => {
		const meetup = {
			id: GeneralID(),
			title: title,
			image: image,
			address: address,
			description: description,
		};

		const result = await createMeetup(meetup);
		console.log(meetup, result);
		navigator("/");
	};

	return (
		<>
			<h1>NewMeetUp Pages</h1>
			<NewMeetUpForm addMeetup={onAddMeetupHandler} />
		</>
	);
};
export default NewMeetUpPage;

const createMeetup = async (item: MeetUpType) => {
	console.log("createMeetup()", item);

	const res = await fetch("http://localhost:3001/", {
		method: "POST",
		body: JSON.stringify(item),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		throw new Error(res.statusText);
	}

	const result = await res.json();
	console.log(result);
	return result;
};
