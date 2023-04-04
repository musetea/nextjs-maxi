import { forwardRef, ForwardedRef } from "react";
import classes from "./ui.module.scss";

interface ComboBoxProps {
	id: string;
	caption: string;
	options: {
		value: string;
		title: string;
	}[];
}

const ComboBox = (
	props: ComboBoxProps,
	ref: ForwardedRef<HTMLSelectElement>
) => {
	const { id, caption, options } = props;

	const optionList = options.map(o => {
		return (
			<option key={o.value} value={o.value}>
				{o.title}
			</option>
		);
	});

	return (
		<div className={classes.control}>
			<label htmlFor={id}>{caption}</label>
			<select id={id} ref={ref}>
				{optionList}
			</select>
		</div>
	);
};

export default forwardRef<HTMLSelectElement, ComboBoxProps>(ComboBox);
