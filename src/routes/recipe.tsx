import { useLoaderData } from "react-router";
import parse from 'html-react-parser';
import { getMarkdownMetadata, markdownToHtml } from "ts-markdown-parser";
import { elementToHtml, parseMarkdown } from "ts-markdown-parser/utils/markdown-parser.js";

export async function loader({ params }: any) {
  const md = (await import(`../recipes/${params.recipeId}.md?raw`))
    .default;
  return { md };
}

export default function Recipe() {
  const { md } = useLoaderData();
  const meta = getMarkdownMetadata(md);
  const title = meta.title;
  const tags = meta.tags
    .replace(" ", "")
    .split(",")
    .map((tag: string): string => "#" + tag)
    .join(" ");

  const parsed = parseMarkdown(md);
  let currSection = undefined;
  let contents = "";
  for (const el in parsed) {
    const content = parsed[el].content;
    const type = parsed[el].type;
    const html = elementToHtml(parsed[el], {});
    if (type == "h2") {
      currSection = content;
    } else if (currSection == "Steps" && type == "ul") {
      continue; // TODO: add class parallel to html element
    }
    contents += html;
  }

  return (
    <>
      <h1>{title}</h1>
      <h4>{tags}</h4>
      {parse(contents)}
    </>
  );
}
