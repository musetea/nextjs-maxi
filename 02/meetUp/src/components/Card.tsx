import { ReactNode } from "react";

const Card: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div
			style={{
				// padding: "1rem",
				backgroundColor: "white",
				borderRadius: ".5rem",
				boxShadow: "2px 4px 8px rgba(0,0,0,0.25)",
			}}
		>
			{children}
		</div>
	);
};
export default Card;
