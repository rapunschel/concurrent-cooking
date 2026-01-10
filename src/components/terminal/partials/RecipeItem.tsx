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
  const handleOnRecipeClick = (title: string) => {
    navigate(`/recipes/${slugify(title)}`);
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
          handleOnRecipeClick(title);
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
