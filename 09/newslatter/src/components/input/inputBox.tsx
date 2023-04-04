import { ForwardedRef, forwardRef } from "react";
import { InputBoxProps } from "@/core/interfaces";
import classes from "./input.module.scss";

const InputBox = (
	props: InputBoxProps,
	ref: ForwardedRef<HTMLInputElement>
) => {
	const { id, type, caption } = props;

	return (
		<div className={classes.control}>
			<label htmlFor={id}>{caption}</label>
			<input type={type} ref={ref} />
		</div>
	);
};

export default forwardRef<HTMLInputElement, InputBoxProps>(InputBox);
