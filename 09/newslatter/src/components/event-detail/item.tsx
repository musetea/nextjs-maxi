import { FC } from "react";
import { ChildProps } from "@/core/interfaces";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import classes from "./event-detail.module.scss";
import { IconType } from "../../core/type";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";

interface ItemPros extends ChildProps {
	icon: IconType;
}

const LogisticsItem: FC<ItemPros> = ({ children, icon }) => {
	const iconSvg =
		icon === IconType.DATE ? (
			<DateIcon />
		) : icon === IconType.ADDRESS ? (
			<AddressIcon />
		) : null;

	return (
		<li className={classes.logistics_item}>
			<span className={classes.icon}>{iconSvg}</span>
			<span className={classes.content}>{children}</span>
		</li>
	);
};
export default LogisticsItem;
