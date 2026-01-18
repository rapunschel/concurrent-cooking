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

export function loader({ params, request }: any): {
  selectedTag: string;
  tags: string[];
  recipes: RecipeMetaData[];
  q: string;
} {
  let selectedTag: string = params.tagId ? deslugify(params.tagId) : "all";
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";

  const { recipes, tags }: { recipes: RecipeMetaData[]; tags: string[] } =
    fetchRecipesData(q, selectedTag);

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
  const navigate = useNavigate();
  const isActive = (header: string) => {
    return activeHeader === header;
  };
  const [{ activeHeader, isSortAsc, sortedRecipes }, setHeaderState] = useState(
    {
      activeHeader: "cpus",
      isSortAsc: false,
      sortedRecipes: recipes,
    }
  );
  const saturation = 100;
  const lightness = 70;

  const sortRecipes = (header: string, isAsc: boolean) => {
    recipes.sort((a: RecipeMetaData, b: RecipeMetaData): number => {
      switch (header) {
        case "cpus":
          console.log("by Cpu");
          console.log(isAsc);

          if (a.threads <= b.threads) return 1;
          else return -1;

        case "time":
          console.log("by time");
          console.log(isAsc);

          if (a.time <= b.time) return 1;
          else return -1;

        case "user":
          console.log("by user");
          console.log(isAsc);

          if (a.user <= b.user) return 1;
          else return -1;

        default:
          console.log("by title");
          console.log(isAsc);

          if (a.title <= b.title) return 1;
          else return -1;
      }
    });

    if (isAsc) return [...sortedRecipes.reverse()];
    else return [...sortedRecipes];
  };

  const handleOnHeaderClick = (header: string) => {
    setHeaderState({
      activeHeader: header,
      isSortAsc: !isSortAsc,
      sortedRecipes: sortRecipes(header, !isSortAsc),
    });
  };

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
          activeHeader={activeHeader}
          onClick={handleOnHeaderClick}
        />
      </div>
      <div className="terminal-content">
        <div className="recipe-container">
          {sortedRecipes.map((recipe, index) => {
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

function TerminalHeader({
  style,
  activeHeader,
  onClick,
}: {
  style?: React.CSSProperties;
  activeHeader: string;
  onClick: any;
}) {
  const title = "title";
  const user = "user";
  const time = "time";
  const threads = "cpus";
  const isActive = (header: string) => {
    return activeHeader === header;
  };
  return (
    <div className="terminal-header" style={style ?? {}}>
      <button
        onClick={() => onClick(title)}
        className={`terminal-header-btn ${isActive(title) ? "active" : ""}`}
      >
        {title}
      </button>
      <button
        onClick={() => onClick(user)}
        className={`terminal-header-btn ${isActive(user) ? "active" : ""}`}
      >
        {user}
      </button>
      <button
        onClick={() => onClick(time)}
        className={`terminal-header-btn ${isActive(time) ? "active" : ""}`}
      >
        {time}
      </button>

      <button
        onClick={() => onClick(threads)}
        className={`terminal-header-btn ${isActive(threads) ? "active" : ""}`}
      >
        {threads}
      </button>
    </div>
  );
}
