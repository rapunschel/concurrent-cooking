import { useLoaderData } from "react-router";
import parse from 'html-react-parser';
import { getMarkdownMetadata } from "ts-markdown-parser";
import { elementToHtml, parseMarkdown } from "ts-markdown-parser/utils/markdown-parser.js";
import type { Component, ReactElement } from "react";

export async function loader({ params }: any) {
  const txt = (await import(`../recipes/${params.recipeId}.md?raw`))
    .default;
  return { txt };
}

function Meta(fm: Record<string, any>): ReactElement {
  const title = fm.title;
  const user = fm.user;
  const tags = fm.tags
    .replace(" ", "")
    .split(",")
    .map((tag: string): string => "#" + tag)
    .join(" ");
  const threads = fm.threads;
  const tot_time = fm.time;
  const hours = tot_time / 60;
  const mins = tot_time % 60;
  const time = (hours > 0 ? `${hours} hours` : "") + (mins > 0 ? `${mins} minutes` : "");
  return (
    <>
      <h1>{title}</h1>
      <div id="meta">
        <ul>
          <li>tags: {tags}</li>
          <li>user: {user}</li>
          <li>threads: {threads}</li>
          <li>time: {time}</li>
        </ul>
      </div>
    </>
  )
}

function Step(lis: string, parallel: boolean = false, threads: number = 1): ReactElement {
  return (
    <>
      <ul
        className={(parallel ? "parallel" : "")}
        style={{ display: "grid", gridTemplateColumns: `repeat(${threads},1fr)` }}>
        {parse(lis)}
      </ul >
    </>
  );
}

function Tag(content: string, type: string): ReactElement {
  return <>{parse(`<${type}>${content}</${type}>`)}</>
}

function Body(md: Record<string, any>): ReactElement {
  let currSection = undefined;
  let contents: ReactElement[] = [];
  for (const el in md) {
    const content = md[el].content;
    const type = md[el].type;
    if (type == "h2") {
      currSection = content;
    }

    if (currSection == "Steps" && type == "ul") {
      contents.push(Step(content, true));
    } else {
      contents.push(Tag(content, type));
    }
  }
  return <>{contents}</>;
}

export default function Recipe(): ReactElement {
  const { txt } = useLoaderData();

  const meta = Meta(getMarkdownMetadata(txt));
  const body = Body(parseMarkdown(txt));

  return (
    <>
      {meta}
      {body}
    </>
  );
}
