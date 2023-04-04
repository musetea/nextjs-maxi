import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./layout.module.scss";

const MainHeader = () => {
	const router = useRouter();
	console.log(router.pathname);

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<Link href="/">Next Events</Link>
			</div>
			<nav className={classes.navigation}>
				<ul>
					{/* <li>
						<Link
							href="/"
							className={router.pathname == "/" ? classes.active : undefined}
						>
							Home
						</Link>
					</li> */}
					<li
						className={
							router.pathname === "/events" ? classes.active : undefined
						}
					>
						<Link href="/events">Events</Link>
					</li>
					<li
						className={
							router.pathname === "/newsletters" ? classes.active : undefined
						}
					>
						<Link href="/newsletters">News Letters</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
export default MainHeader;
