import { FC, forwardRef, ForwardedRef } from "react";
import classes from "../../styles/ui/inputbox.module.scss";

interface InputBoxProps {
	id: string;
	type: string;
	caption: string;
}

const InputBox = (
	props: InputBoxProps,
	ref: ForwardedRef<HTMLInputElement>
) => {
	const { id, type, caption } = props;
	return (
		<div className={classes.control}>
			<label htmlFor={id}>{caption}</label>
			<input type={type} id={id} ref={ref} />
		</div>
	);
};
export default forwardRef<HTMLInputElement, InputBoxProps>(InputBox);
