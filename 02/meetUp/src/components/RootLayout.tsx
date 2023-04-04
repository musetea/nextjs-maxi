import { Outlet, NavLink } from "react-router-dom";
import classes from "./components.module.scss";
import { useContext } from "react";
import { FavoritesContext } from "../store/favorites-context";

const RootLayout = () => {
	const FavoriteCtx = useContext(FavoritesContext);

	return (
		<>
			<header className={classes.header}>
				<div className={classes.logo}>
					<h1>REACT MEETUP</h1>
				</div>
				<nav className={classes.actions}>
					<ul>
						<li>
							<NavLink to={"/"}>Meet Up</NavLink>
						</li>
						<li>
							<NavLink to={"/new"}>New</NavLink>
						</li>
						<li>
							<NavLink to={"/favorites"}>Favorites</NavLink>
							<span className={classes.bedge}>
								{FavoriteCtx.totalFavorites}
							</span>
						</li>
						<li>
							<NavLink to={"/upload"}>Upload Image</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<main className={classes.main}>
				<Outlet />
			</main>
		</>
	);
};
export default RootLayout;
