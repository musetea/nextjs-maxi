import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession, signOut } from "next-auth/react";
import classes from "@/styles/layout/main-nav.module.scss";
import React from "react";

type MenuItemType = {
	href: string;
	caption: string;
};
const menus: MenuItemType[] = [
	{ href: "/contact", caption: "Contact" },
	{ href: "/posts", caption: "Posts" },
	{ href: "/profile", caption: "Profile" },
	{ href: "/auth/signup", caption: "SingUp" },
	{ href: "/auth/user", caption: "User" },
];

const MainNavigation = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	console.log(session, status);

	const menuItems = menus.map(menu => {
		const cls = router.pathname === menu.href ? classes.active : "";
		return (
			<li key={menu.href} className={cls}>
				<Link href={menu.href}>{menu.caption}</Link>
				{/* <p>{`${router.pathname}, ${menu.href} `}</÷p> */}
			</li>
		);
	});

	const onLoginHandler = (event: React.MouseEvent) => {
		signIn();
	};
	const onLogoutHandler = (event: React.MouseEvent) => {
		signOut();
	};

	return (
		<nav>
			<ul className={classes.menus}>{session && menuItems}</ul>
			<div className={classes.actions}>
				{!session && (
					<button type="button" onClick={onLoginHandler}>
						Login
					</button>
				)}
				{session && (
					<button type="button" onClick={onLogoutHandler}>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
};
export default MainNavigation;
