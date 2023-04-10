import { FC, FormEvent, useRef } from "react";
import classes from "../../../styles/user/user.module.scss";

const UserPage: FC = props => {
	const newPassRef = useRef<HTMLInputElement>(null);
	const oldPassRef = useRef<HTMLInputElement>(null);

	const onSubmitHandler = async (event: FormEvent) => {
		event.preventDefault();
		const newPass = newPassRef.current!.value;
		const oldPass = oldPassRef.current!.value;

		try {
			const result = await changePassFetch(newPass, oldPass);
			console.log(result);
			resetValue();
		} catch (err) {
			alert(err);
		}
	};

	const resetValue = () => {
		newPassRef.current!.value = "";
		oldPassRef.current!.value = "";
	};

	return (
		<div className={classes.container}>
			<h1>User</h1>
			<form className={classes.user} onSubmit={onSubmitHandler}>
				<div className={classes.control}>
					<label htmlFor="new-pass">New Password</label>
					<input
						type="password"
						name="new-password"
						id="new-pass"
						required
						ref={newPassRef}
					/>
				</div>
				<div className="classes.control">
					<label htmlFor="old-pass">Old Password</label>
					<input
						type="password"
						name="old-password"
						id="old-pass"
						required
						ref={oldPassRef}
					/>
				</div>
				<div className={classes.actions}>
					<button className={"button"}>Change Password</button>
				</div>
			</form>
		</div>
	);
};
export default UserPage;

const changePassFetch = async (newPass: string, oldPass: string) => {
	//if(!newPass || !oldPass) return;

	const res = await fetch("/api/auth/user/change-password", {
		method: "PATCH",
		body: JSON.stringify({
			newPassword: newPass,
			oldPassword: oldPass,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const result = await res.json();
	return result;
};
