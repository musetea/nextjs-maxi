import React, { useRef, useState } from "react";
import classes from "./drag.module.scss";

const DragDropImage = () => {
	// const refFile = useRef<HTMLInputElement>(null);
	const [images, setImages] = useState<File[]>([]);

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(event.target.files);
		const files = event.target.files;
		if (!files) return;
		for (let i = 0; i < files.length; i++) {
			const file = files[i]!;
			console.log(file);
			setImages(preImages => {
				return [...preImages, file];
			});
		}
		console.log(images);
	};
	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		console.log(e);
		const files = e.dataTransfer.files;
		console.log(files);
		const loadImage: File[] = [];
		for (let i = 0; i < files.length; i++) {
			if (!files[i].type.match("image")) continue;

			if (images.every(img => img.name !== files[i].name)) {
				loadImage.push(files[i]);
			}
		}
	};
	return (
		<>
			<div className={classes.inputDiv} draggable={false} onDrop={onDrop}>
				<p>
					Drag & drop photos here or <strong>Browse</strong>
				</p>
				<input
					// ref={refFile}
					type="file"
					className="file"
					multiple
					accept="image/jpeg, image/png, image/jpg"
					onChange={changeHandler}
				/>
			</div>
			<output></output>
		</>
	);
};
export default DragDropImage;
