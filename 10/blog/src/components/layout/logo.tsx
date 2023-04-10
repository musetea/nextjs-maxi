import Link from "next/link";
import classes from "../../styles/layout/logo.module.scss";

const Logo = () => {
	return (
		<div className={classes.logo}>
			<Link href="/">
				<h1>Blog</h1>
			</Link>
		</div>
	);
};
export default Logo;
