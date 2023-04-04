import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import {
	RouterProvider,
	createBrowserRouter,
	RouteObject,
	BrowserRouter,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/Home";
import NewMeetUpPage from "./pages/New";
import FavoritesPage from "./pages/Favorites";
import UploadPage from "./pages/Upload";
import FavoritesContextProvider from "./store/favorites-context";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/new",
				element: <NewMeetUpPage />,
			},
			{
				path: "favorites",
				element: <FavoritesPage />,
			},
			{
				path: "upload",
				element: <UploadPage />,
			},
		],
	},
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<FavoritesContextProvider>
			<RouterProvider router={router} />
		</FavoritesContextProvider>
		{/* <App /> */}
	</React.StrictMode>
);
