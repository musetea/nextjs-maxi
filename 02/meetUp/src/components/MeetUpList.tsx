import { FC } from "react";
import { MeetUpType } from "../pages/Home";
import MeetUp from "./MeetUp";

const MeetUpList: FC<{ items: MeetUpType[] }> = ({ items }) => {
	const meetUpLists = items.map(i => {
		return (
			<li key={i.id}>
				<MeetUp meetup={i} />
			</li>
		);
	});
	return <ul>{meetUpLists}</ul>;
};
export default MeetUpList;
