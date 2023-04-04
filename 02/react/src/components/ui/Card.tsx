import React, { ReactNode } from "react";
const Card: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div
			className="card"
			style={{
				margin: "0.5rem 1rem",
				padding: "1rem",
				boxShadow: "1px 2px 4px rgba(0,0,0, 0.25)",
			}}
		>
			{children}
		</div>
	);
};
export default Card;
