import type React from "react";
import generateColor from "../../utils/generateColor.ts";
import { useLoaderData, useNavigate } from "react-router";
import { fetchRecipesData } from "../../data/fetchRecipe.ts";
import type { RecipeMetaData } from "../../types.ts";
import { deslugify, slugify } from "../../utils/utils.ts";
import { useMemo, useState } from "react";
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

export default function Top() {
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
  const saturation = 100;
  const lightness = 70;
  const [activeHeader, setHeaderState] = useState("cpus");
  const [isSortAsc, setIsSortAsc] = useState(false);

  const sortRecipes = (header: string, isAsc: boolean) => {
    return [...recipes].sort((a, b) => {
      let valA, valB;

      switch (header) {
        case "cpus":
          valA = a.threads;
          valB = b.threads;
          break;
        case "time":
          valA = a.time;
          valB = b.time;
          break;
        case "user":
          valA = a.user;
          valB = b.user;
          break;
        default:
          valA = a.title;
          valB = b.title;
      }
      if (valA <= valB) return isAsc ? -1 : 1;
      if (valA > valB) return isAsc ? 1 : -1;
      return 0;
    });
  };

  const sortedRecipes = useMemo(() => {
    return sortRecipes(activeHeader, isSortAsc);
  }, [activeHeader, isSortAsc, recipes]);

  const handleOnHeaderClick = (header: string) => {
    setHeaderState((prev) => {
      const isAsc = prev === header ? !isSortAsc : false;
      setIsSortAsc(isAsc);
      return header;
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
        <TopHeader
          style={{
            backgroundColor: generateColor(selectedTag, saturation, lightness),
          }}
          activeHeader={activeHeader}
          onClick={handleOnHeaderClick}
        />
      </div>
      <div className="top-content">
        <div className="recipe-container">
          {sortedRecipes.map((recipe, index) => {
            return <RecipeItem key={index} recipe={recipe} />;
          })}
        </div>
      </div>
      <div className="footer">
        <div className="top-cmds">
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

function TopHeader({
  style,
  activeHeader,
  onClick,
}: {
  style?: React.CSSProperties;
  activeHeader: string;
  onClick: (header: string) => void;
}) {
  const headers = ["title", "user", "time", "cpus"];
  const isActive = (header: string) => {
    return activeHeader === header;
  };
  return (
    <div className="top-header" style={style ?? {}}>
      {headers.map((header) => {
        return (
          <button
            onClick={() => onClick(header)}
            className={`top-header-btn ${isActive(header) ? "active" : ""}`}
          >
            {header}
          </button>
        );
      })}
    </div>
  );
}
