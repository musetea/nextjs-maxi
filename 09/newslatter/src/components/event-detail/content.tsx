import { FC } from "react";
import classes from "./content.module.scss";
import { ChildProps } from "@/core/interfaces";
const EventContet: FC<ChildProps> = ({ children }) => {
	return <section className={classes.content}>{children}</section>;
};
export default EventContet;
