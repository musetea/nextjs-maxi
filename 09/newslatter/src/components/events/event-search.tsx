import { FC, FormEvent, useRef } from "react";
import ComboBox from "../ui/ComboBox";
import classes from "./events.module.scss";
import Button from "../ui/button";

interface SearchProps {
	searchEvents: (year: number, month: number) => void;
}

const EventSearch: FC<SearchProps> = ({ searchEvents }) => {
	const yearRef = useRef<HTMLSelectElement>(null);
	const monthRef = useRef<HTMLSelectElement>(null);

	const onSubmitHandler = (event: FormEvent) => {
		event.preventDefault();
		const year = yearRef.current!.value;
		const month = monthRef.current!.value;

		searchEvents(+year, +month);
	};

	const yearCombo = [
		{ title: "2021", value: "2021" },
		{ title: "2022", value: "2022" },
		{ title: "2023", value: "2023" },
	];
	const monthCombo = [
		{ title: "Juauary", value: "1" },
		{ title: "February", value: "2" },
		{ title: "March", value: "3" },
		{ title: "April", value: "4" },
		{ title: "May", value: "5" },
		{ title: "June", value: "6" },
		{ title: "July", value: "7" },
		{ title: "August", value: "8" },
		{ title: "September", value: "9" },
		{ title: "October", value: "10" },
		{ title: "November", value: "11" },
		{ title: "December", value: "12" },
	];

	return (
		<form className={classes.form} onSubmit={onSubmitHandler}>
			<div className={classes.controls}>
				<ComboBox
					id={"year"}
					caption={"Year"}
					options={yearCombo}
					ref={yearRef}
				/>
				<ComboBox
					id={"month"}
					caption={"Month"}
					options={monthCombo}
					ref={monthRef}
				/>
			</div>
			<Button>Find Event</Button>
		</form>
	);
};
export default EventSearch;
