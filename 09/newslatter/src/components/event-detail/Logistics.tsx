import { FC } from "react";
import Image from "next/image";
import classes from "./event-detail.module.scss";
import { EventType, IconType } from "@/core/type";
import LogisticsItem from "./item";

const EventLogistics: FC<{ event: EventType }> = ({ event }) => {
	const { image, title, date, location } = event;

	const imgUrl = `/images/${image}`;
	const formatDt = new Date(date).toLocaleDateString("kr-KO", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const formatAddr = location.replace(", ", "\n");

	return (
		<section className={classes.logistics}>
			<div className={classes.image}>
				<Image src={imgUrl} alt={title} width={400} height={400} />
			</div>
			<ul className={classes.list}>
				<LogisticsItem icon={IconType.DATE}>
					<time>{formatDt}</time>
				</LogisticsItem>
				<LogisticsItem icon={IconType.ADDRESS}>
					<address>{formatAddr}</address>
				</LogisticsItem>
			</ul>
		</section>
	);
};
export default EventLogistics;
