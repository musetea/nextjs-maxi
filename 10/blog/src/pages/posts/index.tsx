import { FC } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
//
import AllPosts from "@/components/posts/all-posts";
import { PostItemType, PostsProps } from "@/core/posts";
import { getFeaturePosts } from "../../lib/post-md";

const PostsPage: FC<PostsProps> = props => {
	const { posts } = props;
	return (
		<>
			<Head>
				<title>{"All Posts"}</title>
			</Head>
			<AllPosts posts={posts} />
		</>
	);
};
export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
	const posts: PostItemType[] = await getFeaturePosts();

	return {
		props: {
			posts: posts,
		},
	};
};
