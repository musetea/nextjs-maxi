import Head from "next/head";
import { FC } from "react";

interface PageHeadProps {
	title: string;
	year: number;
	month: number;
}

const PageHead: FC<PageHeadProps> = props => {
	const { title, year, month } = props;
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={`All events for ${year}/${month}`} />
		</Head>
	);
};
export default PageHead;
