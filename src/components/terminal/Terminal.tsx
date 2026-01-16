import type React from "react";
import generateColor from "../../utils/generateColor.ts";
import { useLoaderData, useNavigate } from "react-router";
import { fetchRecipesData } from "../../data/fetchRecipe.ts";
import type { RecipeMetaData } from "../../types.ts";
import { deslugify, slugify } from "../../utils/utils.ts";
import { useState } from "react";
import { TagItem } from "./partials/TagItem.tsx";
import { SearchCommand } from "./partials/SearchCommand.tsx";
import { RecipeItem } from "./partials/RecipeItem.tsx";
import { NavBar } from "../NavBar.tsx";

export async function loader({ params, request }: any): Promise<{
  selectedTag: string;
  tags: string[];
  recipes: RecipeMetaData[];
  q: string;
}> {
  let selectedTag: string = params.tagId ? deslugify(params.tagId) : "all";
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";

  const { recipes, tags }: { recipes: RecipeMetaData[]; tags: string[] } =
    await fetchRecipesData(q, selectedTag);

  return { selectedTag, tags, recipes, q };
}

export default function Terminal() {
  const {
    selectedTag,
    tags,
    recipes,
    q,
  }: {
    selectedTag: string;
    tags: string[];
    recipes: RecipeMetaData[];
    q: string;
  } = useLoaderData();

  const [isSearchActive, setSearchActive] = useState(Boolean(q));
  const saturation = 100;
  const lightness = 70;
  const navigate = useNavigate();

  const handleOnTagClick = (tag: string) => {
    navigate(`../${slugify(tag)}`, {
      replace: false,
    });
    if (setSearchActive) setSearchActive(false);
  };
  return (
    <>
      <div className="header">
        <NavBar />
        <div className="tag-list">
          {tags.map((tag: string) => {
            return (
              <TagItem
                key={tag}
                tag={tag}
                isSelected={tag === selectedTag}
                style={{
                  backgroundColor: generateColor(tag, saturation, lightness),
                }}
                onClick={(tag: string) => handleOnTagClick(tag)}
              />
            );
          })}
        </div>
        <TerminalHeader
          style={{
            backgroundColor: generateColor(selectedTag, saturation, lightness),
          }}
        />
      </div>
      <div className="terminal-content">
        <div className="recipe-container">
          {recipes.map((recipe, index) => {
            return <RecipeItem key={index} recipe={recipe} />;
          })}
        </div>
      </div>
      <div className="footer">
        <div className="terminal-cmds">
          <SearchCommand
            props={{
              q: q,
              isSearchActive,
              setSearchActive,
            }}
          />
        </div>
      </div>
    </>
  );
}

function TerminalHeader({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="terminal-header" style={style ?? {}}>
      <p>title</p>
      <p>user</p>
      <p>time</p>
      <p>cpus</p>
    </div>
  );
}
