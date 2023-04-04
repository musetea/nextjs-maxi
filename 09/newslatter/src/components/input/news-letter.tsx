import { Results } from "@/core/interfaces";
import { FormEvent, useRef, useContext } from "react";
import classes from "./input.module.scss";
import NotificationContext from "@/store/notification-context";
import { HttpNotificationType, NotiStatusType } from "@/core/type";

const NewsLetter = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const notiCtx = useContext(NotificationContext);

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();
		const email = emailRef.current?.value;

		if (!email) return;
		// alert(email);
		const result = await createNewLetter(email);
		console.log(result);
		const noti: HttpNotificationType = {
			title: "뉴스레터 알림",
			message: `뉴스레터 에  ${result.email} 등록되었습니다.`,
			status: NotiStatusType.success,
		};
		notiCtx.show(noti);
		emailRef.current.value = "";
	};

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Your Email"
						aria-label="Your Email"
						ref={emailRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
};

export default NewsLetter;

const createNewLetter = async (email: string) => {
	const res = await fetch("/api/newsletter", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: email }),
	});
	if (!res.ok) {
		throw new Error(`createNewLetter(): ${res.statusText}`);
	}

	const result = await res.json();
	// {
	// 	acknowledged: true,
	// 	insertedId: new ObjectId("642b960c2618abd8255a4a34")
	//   }
	//console.log(result);
	return {
		...result,
		email,
	};
};
