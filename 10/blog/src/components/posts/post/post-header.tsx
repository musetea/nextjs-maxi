import { FC } from "react";
import Image from "next/image";
import { PostItemType } from "@/core/posts";
import classes from "@/styles/posts/post/header.module.scss";

interface PostHeaderProps {
	post: PostItemType;
}

const PostHeader: FC<PostHeaderProps> = ({ post }) => {
	const { title, image, slug } = post;

	const imgPath = `/images/posts/${slug}/${image}`; // 이미지경로

	return (
		<header className={classes.header}>
			<h1>{title}</h1>
			<div className={classes.image}>
				<Image src={imgPath} alt={title} width={200} height={150} />
			</div>
		</header>
	);
};
export default PostHeader;
