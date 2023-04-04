import { FC } from "react";
import classes from "./event-detail.module.scss";

const EventSummary: FC<{ title: string }> = ({ title }) => {
	return (
		<section className={classes.summary}>
			<h1>{title}</h1>
		</section>
	);
};
export default EventSummary;
