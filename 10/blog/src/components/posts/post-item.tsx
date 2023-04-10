import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostItemType } from "@/core/posts";
import classes from "../../styles/posts/post-item.module.scss";

interface PostItemProps {
	post: PostItemType;
}

const PostItem: FC<PostItemProps> = props => {
	const { post } = props;
	const { title, date, image, slug } = post;

	const formatDt = new Date(date).toLocaleDateString("ko-Kr", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
	const href = `/posts/${slug}`;
	const imgPath = `/images/posts/${slug}/${image}`;

	return (
		<li className={classes.post}>
			<Link href={href}>
				<div className={classes.image}>
					<Image
						src={imgPath}
						alt={title}
						width={100}
						height={100}
						layout="responsive"
					/>
				</div>
				<div className={classes.content}>
					<h3>{post.title}</h3>
					<time>{formatDt}</time>
					<p>{post.description}</p>
				</div>
			</Link>
		</li>
	);
};

export default PostItem;
