import React, { ReactNode } from "react";
import classes from "../components.module.scss";

const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<div className={classes.backdrop}></div>
			<div className={classes.modal}>{children}</div>
		</>
	);
};
export default Modal;
