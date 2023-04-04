import { FC, useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { GetAllEvents, GetFilterEvents } from "../../net";
import { Results } from "@/core/interfaces";
import { EventType } from "@/core/type";
import EventList from "@/components/events/event-list";
import EventSearch from "../../components/events/event-search";

interface EventPageProps {
	events: EventType[];
}

const EventPages: FC<EventPageProps> = ({ events }) => {
	const [items, setItems] = useState(events);
	const searchEventHandler = async (year: number, month: number) => {
		const path = `events/${year}/${month}`;

		const result = await GetFilterEvents<Results<{ events: EventType[] }>>(
			path
		);
		if (result.status === "fail") {
			console.log(result.message);
		}
		setItems(prevState => result.data?.events);
	};

	return (
		<>
			<Head>
				<title>{"All Events"}</title>
				<meta
					name="descripton"
					content="Find a lot of great events that allow you to evolve..."
				/>
			</Head>
			<EventSearch searchEvents={searchEventHandler} />
			{/* {JSON.stringify(events)} */}
			<EventList events={items} />
		</>
	);
};
export default EventPages;

export const getStaticProps: GetStaticProps = async context => {
	const result = await GetAllEvents<Results<{ events: EventType[] }>>();
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
		revalidate: 60,
	};
};
