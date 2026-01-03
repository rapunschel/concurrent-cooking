import type React from "react";
import generateColor from "../utils/generateColor";
import { useLoaderData, useNavigate } from "react-router";
import { fetchAllRecipes, fetchRecipes, fetchTags } from "../api/recipe";
import type { RecipeLoaderType, RecipeMetaData } from "../types.ts";
import { deslugify, slugify } from "../utils/utils.ts";

export async function loader({ params }: any): Promise<RecipeLoaderType> {
  let selectedTag: string = params.tagId ? deslugify(params.tagId) : "all";

  const tags: string[] = await fetchTags();
  const recipes: RecipeMetaData[] =
    selectedTag === "all"
      ? await fetchAllRecipes()
      : await fetchRecipes(selectedTag);

  return { selectedTag, tags, recipes };
}

type RecipeItemProps = {
  recipe: RecipeMetaData;
  style?: React.CSSProperties;
  onClick?: (text: string) => void;
};

export default function Terminal() {
  const {
    selectedTag,
    tags,
    recipes,
  }: { selectedTag: string; tags: string[]; recipes: RecipeMetaData[] } =
    useLoaderData();

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

function TagItem({
  tag,
  style,
  isSelected,
  onClick,
}: {
  tag: string;
  style?: React.CSSProperties;
  isSelected: boolean;
  onClick?: (text: string) => void;
}) {
  return (
    <button
      className="tag"
      style={style ?? {}}
      onClick={() => {
        onClick?.(tag);
      }}
    >
      {isSelected ? `[${tag}]` : tag}
    </button>
  );
}

function RecipeItem({ recipe, style, onClick }: RecipeItemProps) {
  const { title, cpus, user, time } = recipe;
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="recipe-item"
        style={style ?? {}}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(title);
        }}
      >
        <p>{title}</p>
        <p>{user}</p>
        <p>{time}</p>
        <p>{cpus}</p>
      </div>
    </>
  );
}
