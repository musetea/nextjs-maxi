import { FC } from "react";
import Head from "next/head";
import Hero from "@/components/home/hero";
import FeaturePosts from "../components/home/feature-posts";
import { PostItemType } from "@/core/posts";
import { GetStaticProps } from "next";

import { getFeaturePosts } from "../lib/post-md";

const HomePage: FC<{ posts: PostItemType[] }> = props => {
	const { posts } = props;
	return (
		<>
			<Head>
				<title>{"T is Blogs"}</title>
			</Head>
			<Hero />
			<FeaturePosts posts={posts} />
		</>
	);
};
export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
	const posts = await getFeaturePosts();

	return {
		props: {
			posts: posts,
		},
	};
};
