import { FC, ReactNode } from "react";
import MainNavigation from "./main-nav";
import Logo from "./logo";
import classes from "../../styles/layout/layout.module.scss";

interface LayoutProps {
	children: ReactNode;
}

const Layout: FC<LayoutProps> = props => {
	const { children } = props;

	return (
		<>
			<header className={classes.header}>
				<Logo />
				<MainNavigation />
			</header>
			<main className={classes.container}>{children}</main>
		</>
	);
};
export default Layout;
