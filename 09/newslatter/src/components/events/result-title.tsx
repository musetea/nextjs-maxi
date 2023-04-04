import { FC } from "react";
import { LinkButton } from "../ui/button";

interface ResultTitleProps {
	date: string;
}

const ResultTitle: FC<ResultTitleProps> = ({ date }) => {
	const formatDt = new Date(date).toLocaleDateString("ko-KR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<section>
			<h1>Events in {formatDt}</h1>
			<LinkButton link={"/events"}>show all events</LinkButton>
		</section>
	);
};
export default ResultTitle;
