import { Outlet } from "react-router";
import { fetchAllRecipes, fetchTags } from "../api/recipe";
import type { RecipeLoaderType, RecipeMetaData } from "../types.ts";

export async function loader(): Promise<RecipeLoaderType> {
  let selectedTag: string = "all";

  const tags: string[] = await fetchTags();

  const recipes: RecipeMetaData[] = await fetchAllRecipes();

  return { selectedTag, tags, recipes };
}

export default function Home() {
  return (
    <div className="home">
      <Outlet />
    </div>
  );
}
