import { FC } from "react";
import { CommentType } from "../../core/type";
import classes from "./input.module.scss";

const CommentList: FC<{ items: CommentType[] }> = ({ items }) => {
	const itemLists = items.map(i => {
		console.log(i);
		return (
			<li key={i.commentId}>
				<p>{i.commentMsg}</p>
				<div>
					<span style={{ marginRight: "0.5rem" }}>By</span>
					<address>{i.commender}</address>
				</div>
			</li>
		);
	});
	return <ul className={classes.commentList}>{itemLists}</ul>;
};
export default CommentList;
