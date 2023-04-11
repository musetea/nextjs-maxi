import Link from "next/link";
import { useRouter } from "next/router";
import classes from "../../styles/layout/meetup-nav.module.scss";

const MeetUpNavigation = () => {
	const router = useRouter();
	//const cls = router.pathname.includes(menu.href) ? classes.active : "";
	return (
		<nav className={classes.container}>
			<ul className={classes.nav}>
				<li className={router.pathname === "/meetup" ? classes.active : ""}>
					<Link href="/meetup">All MeetUp</Link>
				</li>
				<li className={router.pathname === "/meetup/new" ? classes.active : ""}>
					<Link href="/meetup/new">New MeetUp </Link>
				</li>
			</ul>
		</nav>
	);
};
export default MeetUpNavigation;
