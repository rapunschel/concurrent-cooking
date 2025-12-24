import { useLoaderData } from "react-router";
import parse from 'html-react-parser';
import { getMarkdownMetadata } from "ts-markdown-parser";
import { elementToHtml, parseMarkdown } from "ts-markdown-parser/utils/markdown-parser.js";

export async function loader({ params }: any) {
  const md = (await import(`../recipes/${params.recipeId}.md?raw`))
    .default;
  return { md };
}

export default function md() {
  const { md } = useLoaderData();
  const meta = getMarkdownMetadata(md);
  const title = meta.title;
  let contents = "";
  const tags = meta.tags
    .replace(" ", "")
    .split(",")
    .map((tag: string): string => "#" + tag)
    .join(" ");
  const parsed = parseMarkdown(md);
  console.log(parsed); // TODO: rm

  let currSection = undefined;
  for (const el in parsed) {
    const content = parsed[el].content;
    const type = parsed[el].type;
    if (type == "h2") {
      currSection = content;
      contents += elementToHtml(parsed[el], {});
    } else {
      if (currSection == "Steps" && type == "ul") {
        continue
      } else if (content.includes("idk")) {
        continue; // TODO: agree on how to render 
      } else {
        contents += elementToHtml(parsed[el], {});
      }
    }
  }


  return (
    <>
      <h1>{title}</h1>
      <h4>{tags}</h4>
      {parse(contents)}
    </>
  );
}
