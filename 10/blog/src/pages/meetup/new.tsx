import { FC, FormEvent, useRef, RefObject, useContext } from "react";
import InputBox from "@/components/ui/InputBox";
import InputArea from "../../components/ui/InputArea";
import classes from "../../styles/meetup/new.module.scss";
import MeetUpNavigation from "../../components/layout/meetup-nav";
import NotifycationContext, {
	getResultType,
} from "@/store/notification-context";

type ControlType = {
	id: string;
	type: string;
	caption: string;
	ref?: RefObject<HTMLInputElement>;
};

const contorls: ControlType[] = [
	{
		id: "title",
		type: "text",
		caption: "Title",
	},
	{ id: "image", type: "url", caption: "Image" },
	{
		id: "address",
		type: "text",
		caption: "Address",
	},
];

interface NewMeetUpProps {
	fnAddMeetUp: (
		title: string,
		image: string,
		address: string,
		description: string
	) => void;
}

const NewMeetUpPage: FC = props => {
	// const { fnAddMeetUp } = props;
	const refs: RefObject<HTMLInputElement>[] = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];
	const descRef = useRef<HTMLTextAreaElement>(null);
	const controlMaps = contorls.map((control, idx) => (control.ref = refs[idx]));
	const notiCtx = useContext(NotifycationContext);
	//console.log(controlMaps);

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();
		console.log("submit");
		const title = contorls[0].ref!.current!.value;
		const image = contorls[1].ref!.current!.value;
		const addr = contorls[2].ref!.current!.value;
		const desc = descRef.current!.value;

		//console.log(title, image, addr, desc);
		try {
			const result = await fetchNewMeetUp(title, image, addr, desc);
			console.log(result);
			notiCtx.show({
				status: getResultType(result.status),
				title: "Add New Meetup " + `(${title})`,
				message: result.message,
			});
			reset();
		} catch (err) {
			alert(err);
		}
	};
	const reset = () => {
		contorls.forEach(f => (f.ref!.current!.value = ""));
		descRef.current!.value = "";
	};

	return (
		<section className={classes.container}>
			<MeetUpNavigation />
			<h1>New Meet Up</h1>
			<form onSubmit={submitHandler} className={classes.form}>
				{contorls.map(control => (
					<InputBox
						key={control.id}
						id={control.id}
						type={control.type}
						caption={control.caption}
						ref={control.ref}
					/>
				))}
				{/* <div className="control">
					<label htmlFor="description">Description</label>
					<textarea id="description" cols={30} rows={10} />
				</div> */}
				<InputArea id={"description"} caption={"Description"} ref={descRef} />
				<div className={classes.actions}>
					<button>Add MeetUp</button>
				</div>
			</form>
		</section>
	);
};
export default NewMeetUpPage;

const fetchNewMeetUp = async (
	title: string,
	image: string,
	address: string,
	description: string
) => {
	const res = await fetch("/api/meetup", {
		method: "POST",
		body: JSON.stringify({
			title,
			image,
			address,
			description,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		console.log(res.statusText);
		throw new Error(res.statusText);
	}

	const result = await res.json();
	return result;
};
