import NextAuth, {
	NextAuthOptions,
	SessionOptions,
	PagesOptions,
	CallbacksOptions,
} from "next-auth";
import { randomUUID, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { getToken, JWTOptions } from "next-auth/jwt";

import { getItem } from "../../../db/mongo";
import { SignInType } from "../../../core/auth";
import { checkHashPassword } from "../../../lib/crypt";

const secret = process.env.NEXTAUTH_SECRET || "!!대한민국!!";
console.log(secret);

const credential = CredentialsProvider({
	type: "credentials",
	name: "Credentials",
	// credentials: {
	// 	email: { label: "email", type: "email" },
	// 	password: { label: "password", type: "password" },
	// },
	async authorize(credentials, req) {
		//console.log(credential);
		const { email, password } = credentials as {
			email: string;
			password: string;
		};
		console.log(email, password);

		if (!email || !password) {
			console.log("Invalid Values");
			return null;
		}

		const filter = {
			email: email,
		};

		const user = await getItem<{ email: string }>(filter);
		console.log(user);

		if (!user) {
			console.log("Not Found User");
			return null;
		}
		//비밀번호 체크
		const isCheck = await checkHashPassword(password, user.password);
		if (!isCheck) {
			console.log("could not login you!!!");
			return null;
		}

		// 토큰 발행
		return {
			email: email,
		};
	},
});

const callbackOptions: Partial<CallbacksOptions> = {
	// Using the `...rest` parameter to be able to narrow down the type based on `trigger`
	jwt({ token, trigger, session, user }) {
		console.log("jwt cb token:", token);
		console.log("jwt cb trigger:", trigger);
		console.log("jwt cb session", session);
		console.log("jwt cb user", user);

		if (trigger === "update" && session?.name) {
			// Note, that `session` can be any arbitrary object, remember to validate it!
			token.name = session;
		}
		return token;
	},
	session({ session, token, user }) {
		console.log("session()session:", session);
		console.log("session():token", token);
		console.log("session():user", user);
		if (token) {
			//session.user = token.email
		}
		return token;
	},
};

const jwtOptions: Partial<JWTOptions> = {
	secret: secret,
	// The maximum age of the NextAuth.js issued JWT in seconds.
	// Defaults to `session.maxAge`.
	maxAge: 60 * 60 * 24 * 30,
	// You can define your own encode/decode functions for signing and encryption
	async encode({ secret, token, maxAge }) {
		// 	console.log("secret", secret);
		// 	console.log("token", token);
		// 	console.log("maxAge", maxAge);
		return jwt.sign(token, secret);
		//return token;
	},
	async decode({ secret, token }) {
		return jwt.verify(token, secret);
	},
};
console.log(jwtOptions);

const sessionOptions: SessionOptions = {
	// Choose how you want to save the user session.
	// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
	// If you use an `adapter` however, we default it to `"database"` instead.
	// You can still force a JWT session by explicitly defining `"jwt"`.
	// When using `"database"`, the session cookie will only contain a `sessionToken` value,
	// which is used to look up the session in the database.
	strategy: "jwt",

	// Seconds - How long until an idle session expires and is no longer valid.
	maxAge: 30 * 24 * 60 * 60, // 30 days

	// Seconds - Throttle how frequently to write to database to extend a session.
	// Use it to limit write operations. Set to 0 to always update the database.
	// Note: This option is ignored if using JSON Web Tokens
	updateAge: 24 * 60 * 60, // 24 hours

	// The session token is usually either a random UUID or string, however if you
	// need a more customized session token string, you can define your own generate function.
	generateSessionToken: async () => {
		return randomUUID?.() ?? randomBytes(32).toString("hex");
	},
};

const pagesOption: Partial<PagesOptions> = {
	signIn: "/auth/signin",
};

export const authOptions: NextAuthOptions = {
	session: sessionOptions,
	jwt: jwtOptions,
	providers: [credential],
	pages: pagesOption,
	callbacks: callbackOptions,
	secret: secret,
};

export default NextAuth(authOptions);
