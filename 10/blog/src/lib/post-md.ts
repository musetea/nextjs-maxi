import path from "path";
import fs from "fs";
import asyncFs from "fs/promises";

import matter from "gray-matter";
import { PostItemType } from "@/core/posts";

//console.log(process.cwd());
const POSTS_DIR = path.join(process.cwd(), "posts");
//console.log(POSTS_DIR);

export const getAllPosts = async () => {
	return new Promise<PostItemType[]>(async (resolve, rejsct) => {
		try {
			const files = fs.readdirSync(POSTS_DIR);
			const allPosts = files.map(file => {
				const filePath = path.join(POSTS_DIR, file);
				return getPostFile(filePath);
			});
			//console.log(allPosts);
			const sortPosts = await allPosts.sort((a, b) =>
				a.date > b.date ? -1 : 1
			);
			resolve(sortPosts);
		} catch (err) {
			rejsct(err);
		}
	});
};

/**
 *
 * @returns
 */
export const getFeaturePosts = async () => {
	return new Promise<PostItemType[]>(async (resolve, reject) => {
		try {
			const allPosts = await getAllPosts();
			//console.log(allPosts);
			const featurePosts = await allPosts.filter(p => p.isFeature === true);
			const sortPosts = await featurePosts.sort((a, b) =>
				a.date > b.date ? -1 : 1
			);
			resolve(sortPosts);
		} catch (err) {
			console.log(err);
			reject(err);
		}
	});
};

/**
 * 파일목록에서 파일이름으로 slug 추출
 * @returns
 */
export const getPostSlugs = () => {
	return new Promise<string[]>(async (resolve, reject) => {
		try {
			//const allPosts = await getAllPosts();
			const files = fs.readdirSync(POSTS_DIR);
			const slugs = files.map(file => file.replace(/\.md$/, ""));
			resolve(slugs);
		} catch (err) {
			reject(err);
		}
	});
};

export const getPost = async (slug: string) => {
	const filePath = path.join(POSTS_DIR, `${slug}.md`);
	const content = await getAsyncPostFile(filePath);
	return parserMatter(content);
};

/**
 * Post File Read
 * 동기함수이므로 async 사용하면 안됨
 * @param filePath
 * @returns
 */
export const getPostFile = (filePath: string) => {
	//console.log("name", name, filePath);
	const fileContent = fs.readFileSync(filePath, "utf-8");
	return parserMatter(fileContent);
	// const { data, content } = matter(fileContent);

	// //const slug = name.replace(/\.md$/, ""); // 파일이름에서 확장자 제거
	// const { slug, title, date, image, description, isFeature } = data;
	// const post: PostItemType = {
	// 	id: "",
	// 	slug: slug,
	// 	title,
	// 	date,
	// 	image,
	// 	description,
	// 	isFeature,
	// 	content,
	// };
	// //console.log("getPostFile()", post, "OK");
	// return post;
};

export const getAsyncPostFile = async (filePath: string) => {
	return await asyncFs.readFile(filePath, "utf-8");
};

/**
 *
 * @param content
 */
const parserMatter = (fileData: string): PostItemType => {
	const { data, content } = matter(fileData);
	//const slug = name.replace(/\.md$/, ""); // 파일이름에서 확장자 제거
	const { slug, title, date, image, description, isFeature } = data;
	const post: PostItemType = {
		id: "",
		slug: slug,
		title,
		date,
		image,
		description,
		isFeature,
		content,
	};
	//console.log("parserMatter()", post, "OK");
	return post;
};
