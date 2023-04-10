import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomdark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

import rangeParser from "parse-numeric-range";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

import classes from "../../../styles/posts/post/content.module.scss";

interface PostContentProps {
	content: string;
}

const PostContent: FC<PostContentProps> = ({ content }) => {
	SyntaxHighlighter.registerLanguage("tsx", tsx);
	SyntaxHighlighter.registerLanguage("typescript", typescript);
	SyntaxHighlighter.registerLanguage("scss", scss);
	SyntaxHighlighter.registerLanguage("bash", bash);
	SyntaxHighlighter.registerLanguage("markdown", markdown);
	SyntaxHighlighter.registerLanguage("json", json);

	// const styleMarkdown = css({
	// 	".codeStyle, pre, code, code span": {
	// 		// Your SyntaxHighlighter override styles here
	// 	},
	// 	code: {
	// 		// Your general code styles here
	// 	},
	// 	"pre code": {
	// 		// Your code-block styles here
	// 	},
	// 	"h3 code": {
	// 		color: "inherit",
	// 	},
	// 	"span.linenumber": {
	// 		display: "none !important",
	// 	},
	// 	'[data="highlight"]': {
	// 		// Your custom line highlight styles here
	// 	},
	// });

	const MarkdownComponents: object = {
		// SyntaxHighlight code will go here

		code({ node, inline, className, ...props }: any) {
			const hasLang = /language-(\w+)/.exec(className || "");
			const hasMeta = node?.data?.meta;
			const applyHighlights: object = (applyHighlights: number) => {
				if (hasMeta) {
					const RE = new RegExp(/{([\d,-]+)}/);
					const metadata = node.data.meta?.replace(/\s/g, "");
					// const strlineNumbers = RE?.test(metadata)
					// 	? RE?.exec(metadata)[1]
					// 	: "0";
					// const highlightLines = rangeParser(strlineNumbers);
					// const highlight = highlightLines;
					// const data: string = highlight.includes(applyHighlights)
					// 	? "highlight"
					// 	: null;
					// return { data };
					return {};
				} else {
					return {};
				}
			};
			return hasLang ? (
				<SyntaxHighlighter
					// 			// style={syntaxTheme}
					language={hasLang[1]}
					PreTag="div"
					className="codeStyle"
					showLineNumbers={true}
					wrapLines={hasMeta}
					useInlineStyles={true}
					lineProps={applyHighlights}
				>
					{props.children}
				</SyntaxHighlighter>
			) : (
				<code className={className} {...props} />
			);
			// };
		},
	};

	return (
		<article className={classes.content}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				// rehypePlugins={[rehypeRaw]}

				components={MarkdownComponents}
			>
				{content}
			</ReactMarkdown>
		</article>
	);
};
export default PostContent;
