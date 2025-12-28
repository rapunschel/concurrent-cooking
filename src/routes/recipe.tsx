import { useLoaderData } from "react-router";
import parse from "html-react-parser";
import { getMarkdownMetadata } from "ts-markdown-parser";
import { parseMarkdown } from "ts-markdown-parser/utils/markdown-parser.js";
import type { ReactElement } from "react";

export async function loader({ params }: any) {
  const txt = (await import(`../recipes/${params.recipeId}.md?raw`)).default;
  return { txt };
}

function CPUs(max: number, available: number = 1): ReactElement {
  let cpus: ReactElement[] = [];
  for (let i = 0; i < max; i++) {
    const id = `cpu${i + 1}`;
    const classes = "cpu" + (i < available ? " available" : "");
    cpus.push(
      <span className={classes} id={id}>▮</span>
    );
  }
  return (
    <>
      <span id="cpus">{cpus}</span>
    </>
  );
}

function Head(fm: Record<string, any>): ReactElement {
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
  const time =
    (hours > 0 ? `${hours} hours` : "") + (mins > 0 ? `${mins} minutes` : "");
  return (
    <>
      <h1>{title}</h1>
      <div id="header">
        <ul className="meta">
          <li><span className="key">tags:</span> {tags}</li>
          <li><span className="key">user:</span> {user}</li>
          <li><span className="key">time:</span> {time}</li>
          <li><span className="key">threads:</span> {threads} <span className="key">CPUs:</span> {CPUs(threads)}</li>
        </ul>
        <button>--verbose</button>
      </div>
    </>
  );
}

function Step(
  lis: string,
  parallel: boolean = false,
  threads: number = 1
): ReactElement {
  return (
    <>
      <ul
        className={parallel ? "step parallel" : "step"}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${threads},1fr)`,
        }}
      >
        {parse(lis)}
      </ul>
    </>
  );
}

function Tag(content: string, type: string, className: string = ""): ReactElement {
  return <>{parse(`<${type} class='${className}'>${content}</${type}>`)}</>;
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
      contents.push(Tag(content, type, type == "p" ? "verbose" : ""));
    }
  }
  return <>{contents}</>;
}

export default function Recipe(): ReactElement {
  const { txt } = useLoaderData();

  const meta = Head(getMarkdownMetadata(txt));
  const body = Body(parseMarkdown(txt));

  return (
    <div className="recipe">
      {meta}
      {body}
    </div>
  );
}
