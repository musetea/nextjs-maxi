import { FC, FormEvent, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import classes from "../../styles/singin/signin.module.scss";
import { SignUpType, SignInType } from "../../core/auth";
import { MogoDBResults } from "../../core";

type AuthModeType = "SIGN UP" | "SIGN IN";

const SigninPage: FC = props => {
	const router = useRouter();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const onSubmitHandler = async (event: FormEvent) => {
		event.preventDefault();

		// 검증하기
		const email = emailRef.current!.value;
		const password = passwordRef.current!.value;
		let result;
		result = await singUp(email, password);
		if (result.status === "success") {
			alert(`${result.data.email} 이 정상적으로 가입되었습니다.`);
			resetControl();
			router.push("/");
		} else {
			alert(`${result.message} 가입도중에 오류발생.`);
		}
	};

	const resetControl = () => {
		emailRef.current!.value = "";
		passwordRef.current!.value = "";
	};

	const title = "SignUp";
	const actionCaption = "SignUp";
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<h1 className={classes.caption}>{title}</h1>
			<form className={classes.signin} onSubmit={onSubmitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="email" required ref={emailRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						ref={passwordRef}
					/>
				</div>
				<div className={classes.actions}>
					<button>{actionCaption}</button>
				</div>
				{/* <div className={classes.signup}>
					<div className={classes.control}>
						<label htmlFor="mode">SignIn</label>
						<input
							id={"auth"}
							value={mode}
							name="mode"
							type="radio"
							//checked={mode === "SIGN IN" ? true : false}
							onClick={e => {
								setMdoe("SIGN IN");
							}}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="mode">SignUp</label>
						<input
							id={"auth"}
							value={mode}
							name="mode"
							type="radio"
							//checked={mode === "SIGN UP" ? true : false}
							onClick={e => {
								setMdoe("SIGN UP");
							}}
						/>
					</div>
				</div> */}
				{/* <p>{mode}</p> */}
			</form>
		</>
	);
};
export default SigninPage;

const singUp = async (email: string, password: string) => {
	const auth: SignUpType = {
		email,
		password,
	};

	const res = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(auth),
	});

	// Mongo Result 객체 반환
	const result = await res.json();
	return result;
};

const singInFetch = async (email: string, password: string) => {
	const auth: SignInType = {
		email,
		password,
	};

	const res = await fetch("/api/auth/signin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(auth),
	});

	if (!res.ok) {
		console.log(res.statusText);
	}

	// Mongo Result 객체 반환
	const result = await res.json();
	console.log(result);

	return result as MogoDBResults<SignInType>;
};
