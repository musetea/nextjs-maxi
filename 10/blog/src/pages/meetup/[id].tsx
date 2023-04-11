import { FC } from "react";
import Image from "next/image";
import { MeetUpType } from "@/models/meetup";
import { GetStaticProps, GetStaticPaths } from "next";
import { ObjectId } from "bson";
import Card from "../../components/ui/card";
import classes from "../../styles/meetup/item.module.scss";

interface DetailMeetUpProps {
	item: MeetUpType;
}

const DetailPage: FC<DetailMeetUpProps> = props => {
	const { title, image, address } = props.item;
	return (
		<section className={classes.container}>
			<li className={classes.item}>
				<Card>
					<div className={classes.image}>
						<Image src={image} alt={title} width={800} height={400} />
					</div>
					<div className={classes.content}>
						<h3>{title}</h3>
						<address>{address}</address>
					</div>
					<div className={classes.actions}></div>
				</Card>
			</li>
			{/* {JSON.stringify(props.item)} */}
		</section>
	);
};
export default DetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch("http://localhost:3000/api/meetup?get=ids");
	if (!res.ok) {
		console.log(res.statusText);
	}
	const result = await res.json();
	if (result.status === "fail") {
		return null;
	}
	//console.log(result.data);
	return {
		paths: result.data,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async context => {
	console.log("context:", context.params);
	const id = context!.params!.id as string;
	console.log(id);
	const res = await fetch(
		"http://localhost:3000/api/meetup/" + new ObjectId(id)
	);
	if (!res.ok) {
		console.log(res.statusText);
	}
	const result = await res.json();
	console.log(result);
	let item: Partial<MeetUpType> = {};
	if (result.status === "fail") {
		console.log(result.message);
	}
	item = result.data;

	return {
		props: {
			item: item,
		},
		revalidate: 60,
	};
};
