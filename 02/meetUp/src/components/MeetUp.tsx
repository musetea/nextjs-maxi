import { useContext } from "react";
import { MeetUpType } from "../pages/Home";
import classes from "./components.module.scss";
import Card from "./Card";
import { FavoritesContext } from "../store/favorites-context";

const MeetUp: React.FC<{ meetup: MeetUpType }> = ({ meetup }) => {
	const favoriteCtx = useContext(FavoritesContext);

	const isFavorite = favoriteCtx.isExistFavorite(meetup.id);

	const clickToogleHandler = () => {
		if (!isFavorite) {
			favoriteCtx.addFavorite({ ...meetup });
		} else {
			favoriteCtx.removeFavorite(meetup.id);
		}
	};

	const caption = isFavorite ? "Remove Favorite" : "To Favorite";

	return (
		<Card>
			<div className={classes.meetup}>
				<h2>{meetup.title}</h2>
				<div className={classes.image}>
					<img src={meetup.image} alt={meetup.title} />
				</div>
				<div className={classes.contents}>
					<address>{meetup.address}</address>
					<p>{meetup.description}</p>
				</div>
				<div className={classes.actions}>
					<button onClick={clickToogleHandler}>{caption}</button>
				</div>
			</div>
		</Card>
	);
};
export default MeetUp;
