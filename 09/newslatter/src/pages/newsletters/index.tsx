import { FC } from "react";
import Head from "next/head";
import { NewsLetterType } from "@/core/type";

interface NewsLetterProps {
	newsletters: NewsLetterType[];
}
const NewsLetterPage: FC<NewsLetterProps> = props => {
	const newsLetters = props.newsletters;
	return (
		<>
			<Head>
				<title>{"News Letter's"}</title>
				<meta
					name="descripton"
					content="Find a lot of great events that allow you to evolve..."
				/>
			</Head>
		</>
	);
};
export default NewsLetterPage;
