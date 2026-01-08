import type React from "react";
import generateColor from "../../utils/generateColor.ts";
import { useLoaderData, useNavigate } from "react-router";
import { fetchRecipesData } from "../../api/recipe.ts";
import type { RecipeMetaData } from "../../types.ts";
import { deslugify, slugify } from "../../utils/utils.ts";
import { useState } from "react";
import { TagItem } from "./partials/TagItem.tsx";
import { SearchCommand } from "./partials/SearchCommand.tsx";
import { RecipeItem } from "./partials/RecipeItem.tsx";

export async function loader({ params, request }: any): Promise<{
  selectedTag: string;
  tags: string[];
  recipes: RecipeMetaData[];
  q: string | null;
}> {
  let selectedTag: string = params.tagId ? deslugify(params.tagId) : "all";
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const { recipes, tags }: { recipes: RecipeMetaData[]; tags: string[] } =
    await fetchRecipesData(q, selectedTag);

  return { selectedTag, tags, recipes, q };
}

export type RecipeItemProps = {
  recipe: RecipeMetaData;
  style?: React.CSSProperties;
  onClick?: (text: string) => void;
};

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
    q: string | null;
  } = useLoaderData();

  const [isSearchActive, setSearchActive] = useState(Boolean(q));
  const saturation = 100;
  const lightness = 70;
  const navigate = useNavigate();

  const handleOnTagClick = (tag: string) => {
    navigate(`/${slugify(tag)}`, {
      replace: false,
    });
  };

  const handleOnRecipeClick = (title: string) => {
    navigate(`/recipes/${slugify(title)}`);
  };

  return (
    <>
      <div className="sticky">
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
      <div className="recipe-container">
        {recipes.map((recipe, index) => {
          return (
            <RecipeItem
              key={index}
              recipe={recipe}
              onClick={handleOnRecipeClick}
            />
          );
        })}
      </div>
      <div className="terminal-cmds">
        <SearchCommand
          props={{
            q: q ?? "",
            navigate,
            isSearchActive,
            onClick: () => {
              setSearchActive(!isSearchActive);
            },
          }}
        />
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
