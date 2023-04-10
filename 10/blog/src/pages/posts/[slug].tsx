import { FC } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import PostContent from "@/components/posts/post/post-content";
import PostHeader from "@/components/posts/post/post-header";
import { PostItemType } from "@/core/posts";
import { getPostSlugs, getPost } from "../../lib/post-md";

interface PostProps {
	post: PostItemType;
}

const PostPage: FC<PostProps> = ({ post }) => {
	const { content } = post;
	return (
		<>
			{/* {JSON.stringify(post)} */}
			<PostHeader post={post} />
			<PostContent content={content} />
		</>
	);
};
export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = await getPostSlugs();
	const params = slugs.map(s => ({
		params: {
			slug: s,
		},
	}));

	return {
		paths: [...params],
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async context => {
	const { params } = context;
	const { slug } = params!;

	const post = await getPost(String(slug));

	return {
		props: {
			post: post,
		},
		revalidate: 600,
	};
};
