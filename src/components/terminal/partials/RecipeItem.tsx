import { slugify } from "../../../utils/utils.ts";
import type { RecipeMetaData } from "../../../types.ts";
import { useNavigate } from "react-router";

export function RecipeItem({
  recipe,
  style,
}: {
  recipe: RecipeMetaData;
  style?: React.CSSProperties;
}) {
  const { title, cpus, user, time } = recipe;
  const navigate = useNavigate();
  const handleOnRecipeClick = (title: string, user: string) => {
    navigate(`/recipes/${user}/${slugify(title)}`);
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="recipe-item"
        style={style ?? {}}
        onClick={(event) => {
          event.stopPropagation();
          handleOnRecipeClick(title, user);
        }}
      >
        <p>{title}</p>
        <p>
          <a
            href={`https://github.com/${user}`}
            onClick={(e) => e.stopPropagation()}
          >
            {user}
          </a>
        </p>
        <p>{time}</p>
        <p>{cpus}</p>
      </div>
    </>
  );
}
