import { useLoaderData } from "react-router";
import parse from "html-react-parser";
import { parseMarkdown } from "ts-markdown-parser/utils/markdown-parser.js";
import { useState, type ReactElement } from "react";
import { fetchRecipe } from "../data/fetchRecipe";
import type { RecipeData } from "../types.ts";
import { inflectNumber } from "../utils/utils.ts";

export function loader({ params }: any): RecipeData {
  return fetchRecipe(params.user, params.recipeId);
}

function CPUs(max: number, available: number = 1): ReactElement {
  let cpus: ReactElement[] = [];
  for (let i = 0; i < max; i++) {
    const id = `cpu${i + 1}`;
    const classes = "cpu" + (i < available ? " available" : "");
    cpus.push(
      <span className={classes} id={id}>
        ▮
      </span>
    );
  }
  return (
    <>
      <span id="cpus">{cpus}</span>
    </>
  );
}

function Head(fm: Record<string, any>, onclick: any): ReactElement {
  const title = fm.title;
  const user = fm.user;
  const tags = fm.tags.map((tag: string): string => "#" + tag).join(" ");
  const threads = fm.threads;
  const tot_time = fm.time;
  const hours = Math.floor(tot_time / 60);
  const mins = tot_time % 60;
  const time =
    (hours > 0 ? `${hours} ${inflectNumber("hour", hours)} ` : "") +
    (mins > 0 ? `${mins} ${inflectNumber("minute", mins)}` : "");
  return (
    <>
      <h1>{title}</h1>
      <div id="header">
        <ul className="meta">
          <li>
            <span className="key">tags:</span> {tags}
          </li>
          <li>
            <span className="key">user:</span> {user}
          </li>
          <li>
            <span className="key">time:</span> {time}
          </li>
          <li>
            <span className="key">threads:</span> {threads}{" "}
            <span className="key">CPUs:</span> {CPUs(threads)}
          </li>
        </ul>
        <button onClick={onclick}>--verbose</button>
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
          gridTemplateColumns: `repeat(${threads}, 1fr)`,
        }}
      >
        {parse(lis)}
      </ul>
    </>
  );
}

function Tag(
  content: string,
  type: string,
  className: string = ""
): ReactElement {
  return <>{parse(`<${type} class='${className}'> ${content}</${type}> `)}</>;
}

function Body(md: Record<string, any>, isVerbose: boolean): ReactElement {
  let currSection = undefined;
  let contents: ReactElement[] = [];
  for (const el in md) {
    const content = md[el].content;
    const type = md[el].type;
    if (type == "h2") {
      currSection = content;
    }
    if (type == "img") {
      continue; // will handle eventually maybe, or maybe not
    }
    if (currSection == "Steps" && type == "ul") {
      contents.push(Step(content, true));
    } else {
      if (!(type == "p" && !isVerbose)) {
        contents.push(Tag(content, type));
      }
    }
  }
  return <>{contents}</>;
}

export default function Recipe(): ReactElement {
  const { metadata, recipe }: RecipeData = useLoaderData();
  const [isVerbose, setVerbose] = useState(false);
  const meta = Head(metadata, () => { setVerbose(!isVerbose) });
  const body = Body(parseMarkdown(recipe), isVerbose);

  return (
    <div className="recipe">
      {meta}
      {body}
    </div>
  );
}
