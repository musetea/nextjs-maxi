import { FC } from "react";
import { ChildProps } from "@/core/interfaces";
import classes from "./ui.module.scss";

const ErrorAlert: FC<ChildProps> = ({ children }) => {
	return <div className={classes.alert}>{children}</div>;
};
export default ErrorAlert;
