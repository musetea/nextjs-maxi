import { PostItemType } from "@/core/posts";
import { FC } from "react";
import PostsList from "../posts/posts-list";
import classes from "../../styles/home/feature-post.module.scss";

interface FeaturePostsPorops {
	posts: PostItemType[];
}

const FeaturePosts: FC<FeaturePostsPorops> = props => {
	const { posts } = props;
	return (
		<section className={classes.latest}>
			<h2>Feature Posts</h2>
			<PostsList posts={posts} />
		</section>
	);
};
export default FeaturePosts;
