import { FC, useRef, useState, useContext } from "react";
import InputBox from "./inputBox";
import classes from "./new-comment.module.scss";
import { NewCommentProps } from "../../core/interfaces";
import { NewCommentType, NotiStatusType } from "@/core/type";
import NotificationContext from "@/store/notification-context";

const NewComment: FC<NewCommentProps> = ({ addComment }) => {
	const emailRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const commentRef = useRef<HTMLTextAreaElement>(null);
	const [isInvalid, setIsInvalid] = useState(false);

	const notiCtx = useContext(NotificationContext);

	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const email = emailRef.current?.value;
		const name = nameRef.current?.value;
		const comment = commentRef.current?.value;

		// validate
		if (!email || !name || !comment) {
			notiCtx.show({
				title: "Add Comment Fail",
				message: "Invalid Items in here!!",
				status: NotiStatusType.error,
			});
			return;
		}

		const newCommnet: NewCommentType = {
			email: email,
			name: name,
			comment: comment,
		};

		addComment(newCommnet, onReset);
	};

	const onReset = () => {
		emailRef.current!.value = "";
		nameRef.current!.value = "";
		commentRef.current!.value = "";
	};

	return (
		<form className={classes.form} onSubmit={onSubmitHandler}>
			<div className={classes.row}>
				<InputBox id="email" type="email" caption="EMAIL" ref={emailRef} />
				<InputBox id="name" type="text" caption="NAME" ref={nameRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor="comment">COMMENT</label>
				<textarea id="comment" rows={5} ref={commentRef}></textarea>
			</div>
			<div className="actions">
				{isInvalid && <p>Please enter a valid emain address and comment!</p>}
				<button>Submit</button>
			</div>
		</form>
	);
};
export default NewComment;
