import { FC } from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import { GetEvent, GetEventIdList } from "../../net";
import { EventType } from "@/core/type";
import Comments from "@/components/input/comments";
import { Results } from "@/core/interfaces";
import EventSummary from "@/components/event-detail/Summery";
import EventLogistics from "@/components/event-detail/Logistics";
import EventContet from "@/components/event-detail/content";

interface EventProps {
	event: EventType;
}

const EventPage: FC<EventProps> = ({ event }) => {
	const { id, title, description } = event;
	console.log(event);

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>
			{/* {JSON.stringify(event)} */}
			<EventSummary title={title} />
			<EventLogistics event={event} />
			<EventContet>
				<p>{description}</p>
			</EventContet>
			<Comments eventId={id} />
		</>
	);
};
export default EventPage;

interface EventIdListProps {
	ids: {
		id: string;
	}[];
}
export const getStaticPaths: GetStaticPaths = async context => {
	const result = (await GetEventIdList()) as Results<EventIdListProps>;

	if (result.status === "fail") {
		return {
			notFound: true,
		};
	}
	const idList = result.data?.ids!;
	// const params = idList?.map(i => {
	// 	return {
	// 		params: {
	// 			id: i.id,
	// 		},
	// 	};
	// });
	const params = idList.map(i => ({ params: { id: i.id } }));
	//console.log(params);
	return {
		paths: [...params],
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<EventProps> = async context => {
	const id = context.params?.id! as string;
	console.log("getStaticProps()", id);
	if (!id) {
		return {
			notFound: true,
		};
	}
	// const result = await GetEvent<Results<{ events: EventType[] }>>(id);
	const result = (await GetEvent(id)) as Results<{ events: EventType[] }>;
	// const result = await GetAllEvents<Results<{ events: EventType[] }>>();
	console.log(result);
	if (!result || result.status === "fail") {
		return {
			notFound: true,
		};
	}
	console.log(result.data);

	const event = result.data?.events[0];
	return {
		props: {
			event: event,
		},
	};
};
