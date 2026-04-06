import { useLoaderData } from "react-router";
import { useState, type ReactElement } from "react";
import { fetchRecipe } from "../data/fetchRecipe";
import type { RecipeData } from "../types.ts";
import { inflectNumber } from "../utils/utils.ts";
import { User } from "../components/top/User.tsx";

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
            <span className="key">user:</span> <User user={user} />
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
  threads: number = 1
): ReactElement {
  // string manipulation because apparently there is no way to get the children of a react el obtained with parse(html)...
  const html = (lis.replaceAll("<li>", "<li><div>").replaceAll("</li>", "</div></li>"));
  const n = (html.match(/\<li\>/g) || []).length
  return n > 1 ? (<><li><div></div></li><ul>{parse(html)}</ul></>) : (<>{parse(html)}</>);
}

function Tag(
  content: string,
  type: string,
  className: string = ""
): ReactElement {
  return <>{parse(`<${type} class='${className}'> ${content}</${type}> `)}</>;
}

function Body(md: Record<string, any>, isVerbose: boolean): ReactElement {
  let currSection: string | null = null;
  let contents: ReactElement[] = [];
  let steps: ReactElement[] = [];
  md.forEach((el: { type: string, content: string }, i: number) => {
    const content = el.content;
    const type = el.type;
    if (i + 1 == md.length) {
      contents.push(<ul className="step">{steps}</ul>);
    }
    if (!(type == "img")) {
      if (type == "h2") {
        if (currSection == "Steps") {
          contents.push(<ul className="step"><li></li>{steps}</ul>);
          steps = [];
        }
        currSection = content;
      }
      if (currSection == "Steps" && type == "ul") {
        steps.push(Step(content));
      } else {
        if (!(type == "p" && !isVerbose)) {
          contents.push(Tag(content, type));
        }
      }
    }
  })
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
