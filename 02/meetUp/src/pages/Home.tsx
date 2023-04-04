import { useState, useEffect } from "react";
import dummyData from "./../../data/meetup.json";
//console.log(dummyData.MEETUP);
import MeetUp from "../components/MeetUp";
import Loading from "../components/Loading";
import MeetUpList from "../components/MeetUpList";

export type MeetUpType = {
	id: string;
	title: string;
	image: string;
	address: string;
	description: string;
};

const HomePage = () => {
	const [items, setItems] = useState<MeetUpType[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");
	//console.log(items);
	useEffect(() => {
		setLoading(true);
		getMeetups()
			.then(data => {
				// console.log(data);
				setLoading(false);
				const meetups = data.MEETUP;
				setItems([...meetups]);
			})
			.catch(error => {
				setLoading(false);
				console.log(error);
				setError(error);
			});
	}, []);

	if (isLoading) {
		return <Loading />;
	}
	if (error !== "") {
		return <p>{error}</p>;
	}

	return (
		<section>
			<h1>Home Pages</h1>
			<MeetUpList items={items} />
		</section>
	);
};
export default HomePage;

const getMeetups = async () => {
	try {
		const res = await fetch("http://localhost:3001/", {
			method: "GET",
		});
		if (!res.ok) throw new Error(`${res.statusText}`);

		const data = await res.json();
		//console.log(data);
		return data;
	} catch (err: any) {
		throw err.message;
	}
};
