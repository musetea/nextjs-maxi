import React, { useState } from "react";
import classes from "./components.module.scss";
import Card from "./ui/Card";
import Modal from "./ui/Modal";

const Todo: React.FC<{ title: string }> = ({ title }) => {
	const [isModal, setIsModal] = useState(false);

	const deleteHandler = () => {
		setIsModal(true);
	};
	const closeModal = () => {
		setIsModal(false);
	};

	return (
		<Card>
			<div className={classes.todo}>
				<h2 className={classes.title}>{title}</h2>
				<div className={classes.actions}>
					<button className="button" onClick={deleteHandler}>
						Delete
					</button>
				</div>
			</div>
			{isModal && (
				<Modal>
					<div className={classes.container}>
						<h1>Are your's Sure!!!!</h1>
						<div className={classes.actions}>
							<button onClick={closeModal}>OK</button>
							<button onClick={closeModal}>Cancle</button>
						</div>
					</div>
				</Modal>
			)}
		</Card>
	);
};
export default Todo;
