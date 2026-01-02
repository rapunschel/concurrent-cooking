//import { useState } from "react";
import type React from "react";
import generateColor from "../utils/generateColor";
import { useLoaderData } from "react-router";
import { fetchAllRecipes, fetchRecipes, fetchTags } from "../api/recipe";

export async function loader({ params }: any): Promise<LoaderType> {
  let selectedTag: string = params.tagId
    ? params.tagId.replace(/-/g, " ")
    : "all";

  const tags: string[] = await fetchTags();

  const recipes: RecipeMetaData[] =
    selectedTag === "all"
      ? await fetchAllRecipes()
      : await fetchRecipes(selectedTag);

  return { selectedTag, tags, recipes };
}

type LoaderType = {
  selectedTag: string;
  tags: string[];
  recipes: RecipeMetaData[];
};

type RecipeMetaData = {
  title: string;
  tags: string[];
  cpus: number;
  user: string;
  time: number;
};

type RecipeItemProps = {
  recipe: RecipeMetaData;
  style?: React.CSSProperties;
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
                padding: "4px",
              }}
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
          return <RecipeItem key={index} recipe={recipe} />;
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
}: {
  tag: string;
  style?: React.CSSProperties;
  isSelected: boolean;
}) {
  return (
    <p className="tag" style={style ?? {}}>
      {isSelected ? `[${tag}]` : tag}
    </p>
  );
}

function RecipeItem({ recipe, style }: RecipeItemProps) {
  const { title, cpus, user, time } = recipe;
  return (
    <>
      <div className="recipe-item" style={style ?? {}}>
        <p>{title}</p>
        <p>{user}</p>
        <p>{time}</p>
        <p>{cpus}</p>
      </div>
    </>
  );
}
