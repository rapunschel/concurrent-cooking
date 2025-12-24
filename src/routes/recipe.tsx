import { useLoaderData } from "react-router";

export async function loader({ params }: any) {
  const recipe = (await import(`../public/recipes/${params.recipeId}.md?raw`))
    .default;
  return { recipe };
}

export default function Recipe() {
  const { recipe } = useLoaderData();

  return (
    <>
      <p>{recipe}</p>
    </>
  );
}
