import data from "./data.json" with  { type: "json" };
import type { RecipeMetaData, RecipeData } from "../types.ts";

function getMetaData() {
  let tags : string[] = ["all"];
  let recipesMetaData : RecipeMetaData[] = [];
  for (const userRecipes of Object.values(data)) {
    for (const recipe of Object.values(userRecipes)) {
      tags.push(...recipe.metadata.tags)
      recipesMetaData.push(recipe.metadata)
    }
  }

  return{tags: [...new Set(tags)], recipesMetaData};
}

export  function fetchRecipesData(
  query: string | null,
  tag: string | null
) {
  if (!tag || tag === "") tag = "all";
  const {tags, recipesMetaData} = getMetaData();

  if (!tags.includes(tag)) {
    throw new Error(`Tag "${tag}" does not exist.`);
  }


  const fileredRecipes = tag === "all" ? recipesMetaData : recipesMetaData.filter((recipe) => recipe.tags.includes(tag));

  const recipes = fileredRecipes.filter((recipe) => {
    if (!query) return true;
    query = query.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.user.toLowerCase().includes(query) ||
      recipe.threads.toString().toLowerCase().includes(query) ||
      recipe.time.toString().toLowerCase().includes(query)
    );
  });

  return { tags, recipes };
}

export function fetchRecipe(user : string, recipeId : string) : RecipeData {
  const recipes = data as Record<string, any>;
  const userData = recipes[user];
  if (!userData) throw new Error(`No data found for: ${user}`)

  const recipe : RecipeData |null = userData[recipeId];

  if (!recipe) throw new Error(`Could not find recipe: ${recipeId}`);

  return recipe;
}
