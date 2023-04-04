import { CommentType, NewCommentType, NotiStatusType } from "@/core/type";
import { FC, useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./input.module.scss";
import NotificationContext from "@/store/notification-context";
import { Results } from "@/core/interfaces";

const Comments: FC<{ eventId: string }> = ({ eventId }) => {
	const [show, setShow] = useState(false);
	const [comments, setComments] = useState<CommentType[]>([]);
	const notiCtx = useContext(NotificationContext);

	useEffect(() => {
		if (!show) return;
		getComment(eventId)
			.then(items => {
				//console.log(items);
				setComments(items);
			})
			.catch(err => {
				console.log(err);
			});
	}, [show]);

	const addCommnetHandler = async (
		comment: NewCommentType,
		onReset: () => void
	) => {
		console.log(comment);

		try {
			const url = `/api/comments/${eventId}`;
			const result = await addComment(url, comment);
			console.log(result);
			notiCtx.show({
				title: `${eventId} 코멘트 등록`,
				message: `${result.tittle} 코멘트가 등록되었습니다.`,
				status: NotiStatusType.success,
			});
			onReset();
		} catch (err: any) {
			notiCtx.show({
				title: `${eventId} 코멘트 등록오류`,
				message: `${err.message} 에러가 발생했습니다.`,
				status: NotiStatusType.error,
			});
		}
	};

	const toggleCommendHandler = () => {
		setShow(prev => !prev);
	};

	const caption = show ? "Hide Commnet" : "Show Commnet";
	const newComment = show ? (
		<NewComment addComment={addCommnetHandler} />
	) : null;

	const listComment = show ? <CommentList items={comments} /> : null;
	return (
		<section className={classes.comments}>
			<button onClick={toggleCommendHandler}>{caption}</button>
			{newComment}
			{listComment}
		</section>
	);
};

export default Comments;

const addComment = async (url: string, comment: NewCommentType) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(comment),
	});
	if (!res.ok) {
		throw new Error(`${res.statusText}`);
	}

	const result = await res.json();
	// console.log(result);
	return {
		...result,
		...comment,
	};
};

const getComment = async (eventId: string) => {
	const url = `/api/comments/${eventId}`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("getComment() " + res.statusText);
	}
	const result = (await res.json()) as Results<{ comments: CommentType[] }>;
	if (result.status === "fail") {
		throw new Error(`${result.message}`);
	}
	const comments = result.data?.comments;
	return comments;
};
