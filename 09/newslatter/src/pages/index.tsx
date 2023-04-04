import EventList from "@/components/events/event-list";
import Head from "next/head";
import { GetStaticProps } from "next";

import NewsLetter from "./../components/input/news-letter";
import { EventType } from "@/core/type";
import { getFeaturedEvents } from "../net";
import { Results } from "@/core/interfaces";

interface HomeProps {
	events: EventType[];
}

export default function Home(props: HomeProps) {
	const { events } = props;

	return (
		<>
			<Head>
				<title>NetJS Events</title>
				<meta
					name="description"
					content="Find a lot of great events that allow you to evolve..."
				/>
			</Head>
			<NewsLetter />
			<EventList events={events} />
		</>
	);
}

export const getStaticProps: GetStaticProps = async context => {
	const result = (await getFeaturedEvents()) as Results<{
		events: EventType[];
	}>;
	console.log(result);
	if (result.status === "fail") {
		return {
			notFound: true,
		};
	}
	const events = result.data?.events;
	//console.log(events);

	return {
		props: {
			events: events,
		},
		revalidate: 1800,
	};
};
