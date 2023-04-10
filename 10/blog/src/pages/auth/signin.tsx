import { FC, FormEvent, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import classes from "../../styles/singin/signin.module.scss";
import { SignUpType, SignInType } from "../../core/auth";
import { MogoDBResults } from "../../core";
import { signIn } from "next-auth/react";

type AuthModeType = "SIGN UP" | "SIGN IN";

const SigninPage: FC = props => {
	const router = useRouter();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const signInFn = async () => {
		// try {
		// 	const result = await singIn(email, password);
		// 	if (result.status === "success") {
		// 	} else {
		// 	}
		// } catch (err) {
		// 	console.error(err);
		// }
	};

	const onSubmitHandler = async (event: FormEvent) => {
		event.preventDefault();

		// 검증하기
		const email = emailRef.current!.value;
		const password = passwordRef.current!.value;

		const result = await signIn("credentials", {
			redirect: false,
			email: email,
			password: password,
		});
		console.log(result);
		if (!result?.error) {
			router.push("/");
		}
	};

	const resetControl = () => {
		emailRef.current!.value = "";
		passwordRef.current!.value = "";
	};

	const title = "LOG IN";
	const actionCaption = "LOG IN";
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<h1 className={classes.caption}>{title}</h1>
			<form className={classes.signin} onSubmit={onSubmitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						ref={emailRef}
						defaultValue="test@gmail.com"
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						ref={passwordRef}
						defaultValue="1234"
					/>
				</div>
				<div className={classes.actions}>
					<button>{actionCaption}</button>
				</div>
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
