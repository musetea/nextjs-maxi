import { FC } from "react";
import PostItem from "./post-item";
import { PostItemType } from "../../core/posts";
import classes from "../../styles/posts/post-list.module.scss";

interface PostsProps {
	posts: PostItemType[];
}

const PostsList: FC<PostsProps> = props => {
	const { posts } = props;

	const itemsList = posts.map(post => {
		return <PostItem key={post.id} post={post} />;
	});

	return (
		<>
			<ul className={classes.posts}>{itemsList}</ul>
		</>
	);
};
export default PostsList;
