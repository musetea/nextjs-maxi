import { useContext } from "react";
import MeetUpList from "../components/MeetUpList";
import { FavoritesContext } from "../store/favorites-context";

const FavoritesPage = () => {
	const favoriteCtx = useContext(FavoritesContext);

	return (
		<>
			<h1>Favorites Pages</h1>
			<MeetUpList items={favoriteCtx.favorites} />
		</>
	);
};
export default FavoritesPage;
