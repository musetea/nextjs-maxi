import { FC } from "react";
import Image from "next/image";
import { EventItemProps } from "../../core/interfaces";
import classes from "./events.module.scss";
import AddressIcon from "../icons/AddressIcon";
import DateIcon from "../icons/DateIcon";
import { LinkButton } from "../ui/button";
import ArrowRightIcon from "../icons/ArrowRightIcon";

const EventItem: FC<EventItemProps> = props => {
	const { title, image, date, location, id } = props.event!;

	const imgUrl = `/images/${image}`;
	const formatDt = new Date(date).toLocaleDateString("ko-Kr", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	const formatAddr = location.replace(", ", "\n");

	const exploreLink = `/events/${id}`;

	return (
		<li className={classes.item}>
			<Image src={imgUrl} alt={title} width={250} height={160} />
			<div className={classes.content}>
				<div className={classes.summay}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{formatDt}</time>
					</div>

					<div className={classes.address}>
						<AddressIcon />
						<address>{formatAddr}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<LinkButton link={exploreLink}>
						<span>Explore Event</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</LinkButton>
				</div>
			</div>
		</li>
	);
};
export default EventItem;
