import { FC } from "react";
import Link from "next/link";

import { ButtonProps, LinkButtonProps } from "../../core/interfaces";
import classes from "./ui.module.scss";

const Button: FC<ButtonProps> = ({ children, onClick }) => {
	return (
		<button className={classes.button} onClick={onClick}>
			{children}
		</button>
	);
};
export default Button;

export const LinkButton: FC<LinkButtonProps> = ({ children, link }) => {
	return <Link href={link}>{children}</Link>;
};
