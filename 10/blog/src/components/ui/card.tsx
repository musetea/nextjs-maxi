import { FC, ReactNode } from "react";

const Card: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div
			style={{
				backgroundColor: "white",
				borderRadius: "6px",
				boxShadow: "0 2px 8px rgba(0,0,0, 0.25)",
			}}
		>
			{children}
		</div>
	);
};
export default Card;
