import type { RecipeItemProps } from "../Terminal";

export function RecipeItem({ recipe, style, onClick }: RecipeItemProps) {
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
