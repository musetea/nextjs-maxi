import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import MeetUpNavigation from "../../components/layout/meetup-nav";
import classes from "../../styles/meetup/meetup.module.scss";
import { MeetUpType } from "@/models/meetup";
import { GetStaticProps } from "next";

const dummy: MeetUpType[] = [
	{
		id: "6434e736a62b039ec8f926eb",
		title: "A First MeetUp",
		image:
			"https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
		address: "Some address 5, 12322 Some City",
		description: "This is a first meet up.",
	},
];

interface MeetUpProps {
	items: MeetUpType[];
}

const MeetUpPage: FC<MeetUpProps> = props => {
	const { items } = props;
	return (
		<>
			<MeetUpNavigation />
			<h1 className={"title"}>All MeetUp</h1>
			<section className={classes.container}>
				<ul>
					{/* {JSON.stringify(items)} */}
					{items.map(meetup => {
						return <MeetUpItem key={meetup.id.toString()} meetup={meetup} />;
					})}
				</ul>
			</section>
		</>
	);
};
export default MeetUpPage;

interface MeetUpItemProps {
	meetup: MeetUpType;
}

const MeetUpItem: FC<MeetUpItemProps> = props => {
	const { id, title, image, address, description } = props.meetup;
	return (
		<li>
			<div className={classes.image}>
				{/* <img src={image} alt={title} /> */}
				<Image src={image} alt={title} width={750} height={320} />
			</div>
			<div className={classes.contents}>
				<h2>{title}</h2>
				<address>{address}</address>
				<p>{description}</p>
			</div>
			<div className={classes.actions}>
				<button>
					<Link href={`/meetup/${id}`}>Detail</Link>
				</button>
			</div>
		</li>
	);
};

// export const getStaticPaths: GetStaticPaths = async () => {
// 	return {
// 		paths: [],
// 		fallback: false,
// 	};
// };

export const getStaticProps: GetStaticProps<
	MeetUpItemProps
> = async context => {
	let items: MeetUpType[] = [];
	console.log("getStaticProps()");
	try {
		const res = await fetch("http://localhost:3000/api/meetup");
		if (!res.ok) {
			console.log(res);
		}
		const result = await res.json();
		//console.log(result);
		items = result.data;
		return {
			props: {
				items: items,
			},
		};
	} catch (err: any) {
		console.error(err);
		throw new Error(err.message);
		return null;
	}
};
