import { FC } from "react";
import { EventListProps } from "../../core/interfaces";
import EventItem from "./event-item";
import classes from "./events.module.scss";

const EventList: FC<EventListProps> = ({ events }) => {
	const items = events.map(e => {
		return <EventItem key={e.id} event={e} />;
	});

	return <ul className={classes.list}>{items}</ul>;
};
export default EventList;
