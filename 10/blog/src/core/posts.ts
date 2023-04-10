/**
 * POST'S
 */

export type PostItemType = {
	id: string;
	title: string;
	description: string;
	date: string;
	image: string;
	slug: string;
	content: string;
	isFeature: boolean;
};

export interface PostsProps {
	posts: PostItemType[];
}
