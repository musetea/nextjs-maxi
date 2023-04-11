import { FC, forwardRef, ForwardedRef, RefObject } from "react";
import classes from "../../styles/ui/inputbox.module.scss";

interface InputAreaProps {
	id: string;
	//type: string;
	caption: string;
	//ref: RefObject<HTMLTextAreaElement>;
}

const InputArea = (
	props: InputAreaProps,
	ref: ForwardedRef<HTMLTextAreaElement>
) => {
	const { id, caption } = props;
	return (
		<div className={classes.control}>
			<label htmlFor={id}>{caption}</label>
			<textarea id={id} ref={ref} cols={30} rows={10} />
		</div>
	);
};
export default forwardRef<HTMLTextAreaElement, InputAreaProps>(InputArea);
