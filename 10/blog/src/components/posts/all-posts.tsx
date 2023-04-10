import { FC } from "react";
import PostsList from "./posts-list";
import { PostsProps } from "@/core/posts";
import classes from "../../styles/posts/all-post.module.scss";

const AllPosts: FC<PostsProps> = props => {
	const { posts } = props;

	return (
		<section className={classes.posts}>
			<h1>All Posts</h1>
			<PostsList posts={posts} />
		</section>
	);
};

export default AllPosts;
