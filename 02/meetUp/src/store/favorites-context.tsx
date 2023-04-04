import React, { createContext, ReactNode, useState } from "react";
import { MeetUpType } from "../pages/Home";

// const defaultValue = {
// 	favorites: [],
// 	totalFavorites: 0,
// };
interface ContextType {
	favorites: MeetUpType[];
	totalFavorites: number;
	addFavorite: (meetup: MeetUpType) => void;
	removeFavorite: (id: string) => void;
	isExistFavorite: (id: string) => boolean;
}
const defaultValue: ContextType = {
	favorites: [],
	totalFavorites: 0,
	addFavorite: (meetup: MeetUpType) => {},
	removeFavorite: (id: string) => {},
	isExistFavorite: (id: string) => true,
};

export const FavoritesContext = createContext(defaultValue);

const FavoritesContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [favorites, setFavorites] = useState<MeetUpType[]>([]);
	//const [totalFavorites, setTotalFavorites] = useState(0);

	const addFavoriteHandler = (meetup: MeetUpType) => {
		setFavorites(prev => {
			return prev.concat(meetup);
		});
		console.log(favorites);
	};
	const removeFavoriteHandler = (id: string) => {
		setFavorites(prev => prev.filter(p => p.id !== id));
		console.log(favorites);
	};

	const isExistFavoriteHandler = (id: string) => {
		return favorites.some(f => f.id === id);
	};

	const context = {
		favorites: favorites,
		totalFavorites: favorites.length,
		addFavorite: addFavoriteHandler,
		removeFavorite: removeFavoriteHandler,
		isExistFavorite: isExistFavoriteHandler,
	};

	return (
		<FavoritesContext.Provider value={context}>
			{children}
		</FavoritesContext.Provider>
	);
};
export default FavoritesContextProvider;
