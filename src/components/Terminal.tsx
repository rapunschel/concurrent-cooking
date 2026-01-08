import type React from "react";
import generateColor from "../utils/generateColor";
import {
  useLoaderData,
  useNavigate,
  Form,
  type NavigateFunction,
} from "react-router";
import { fetchRecipesData } from "../api/recipe";
import type { RecipeMetaData } from "../types.ts";
import { deslugify, slugify } from "../utils/utils.ts";
import { useEffect, useState } from "react";

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
        <Search
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

function Search({
  props,
}: {
  props: {
    q: string;
    navigate: NavigateFunction;
    isSearchActive: Boolean;
    onClick: any;
  };
}) {
  const { q, navigate, isSearchActive, onClick } = props;

  useEffect(() => {
    const input = document.getElementById("q") as HTMLInputElement | null;
    if (input) {
      input.value = q;
    }
  }, [q]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (event.currentTarget.q as HTMLInputElement).value.trim();
    navigate(`?q=${encodeURIComponent(query)}`);
    const input = document.getElementById("q") as HTMLInputElement;
    input.blur();
  };

  return (
    <>
      {isSearchActive ? (
        <>
          <Form id="search-form" role="search" tabIndex={0} onSubmit={onSubmit}>
            <label htmlFor="q">search:&nbsp;</label>
            <input
              type="search"
              id="q"
              name="q"
              aria-label="Search recipe"
              defaultValue={q}
              autoFocus
            />
            <button type="button" onClick={onClick}>
              X
            </button>
          </Form>
        </>
      ) : (
        <button type="button" onClick={onClick}>
          search
        </button>
      )}
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
