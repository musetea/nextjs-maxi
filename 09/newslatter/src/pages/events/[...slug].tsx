import EventList from "@/components/events/event-list";
import { EventType } from "@/core/type";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FC, useEffect, useState } from "react";
import PageHead from "../../components/layout/page-head";
import ResultTitle from "../../components/events/result-title";
import { Results } from "@/core/interfaces";
import { GetFilterEvents, getDomain } from "../../net/index";

interface EventsProps {
	events: EventType[];
	year: number;
	month: number;
}

const FliterEvents: FC<EventsProps> = props => {
	const [items, setItems] = useState<EventType[]>([]);
	const [error, setError] = useState();

	// const { events, year, month } = props;
	const router = useRouter();
	const filter = router.query.slug!;

	useEffect(() => {
		if (!filter) return;
		const url = `${getDomain()}/events/${filter[0]}/${filter[1]}`;
		filterEvents(url)
			.then(result => {
				if (result.status === "fail") {
					setError(result?.message);
					return;
				}
				const events = result.data?.events;
				console.log(events);
				setItems(events);
			})
			.catch(err => {
				console.log(err);
				setError(err);
			});
	}, []);

	//const url = `${getDomain()}/events/${filter[0]}/${filter[1]}`;
	//console.log(filter, url);
	if (!filter) return <p>Loading...</p>;
	const year = Number(filter[0]);
	const month = Number(filter[1]);

	//const { data, error } = useSWR(url);
	//console.log(data);
	//console.log(error);
	if (!items) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<PageHead title={"Fillterd Events"} year={2021} month={2} />
			<ResultTitle date={`${year}-${month}`} />
			{error && <p>{error}</p>}
			<EventList events={items} />;
		</>
	);
};
export default FliterEvents;

// export const getServerSideProps: GetServerSideProps<
// 	EventsProps
// > = async context => {
// 	const { params } = context;
// 	const [year, month] = params.slug!;
// 	console.log(year, month);
// 	const path = `events/${year}/${month}`;
// 	const result = await GetFilterEvents<Results<{ events: EventType[] }>>(path);
// 	console.log(result);
// 	if (result.status === "fail") {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	const events = result.data?.events;
// 	return {
// 		props: {
// 			events: events,
// 			year: year,
// 			month: month,
// 		},
// 	};
// };

const filterEvents = async (path: string) => {
	try {
		const result = await GetFilterEvents<Results<{ events: EventType[] }>>(
			path
		);
		return result;
	} catch (err: any) {
		throw new Error("filterEvents(): " + err.message);
	}
};
