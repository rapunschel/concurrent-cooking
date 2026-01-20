import data from "./data.json" with { type: "json" };
import type { RecipeMetaData, RecipeData } from "../types.ts";

function getMetaData() {
  let tags: string[] = ["all"];
  let recipesMetaData: RecipeMetaData[] = [];
  for (const userRecipes of Object.values(data)) {
    for (const recipe of Object.values(userRecipes)) {
      tags.push(...recipe.metadata.tags);
      recipesMetaData.push(recipe.metadata);
    }
  }

  return { tags: [...new Set(tags)], recipesMetaData };
}

export function fetchRecipesData(query: string | null, tag: string | null) {
  if (!tag || tag === "") tag = "all";
  const { tags, recipesMetaData } = getMetaData();

  if (!tags.includes(tag)) {
    throw new Error(`Tag "${tag}" does not exist.`);
  }

  const fileredRecipes =
    tag === "all"
      ? recipesMetaData
      : recipesMetaData.filter((recipe) => recipe.tags.includes(tag));

  const recipes = fileredRecipes.filter((recipe) => {
    if (!query) return true;
    const parsedQuery = _parseQuery(query.toLowerCase());

    return (
      (!parsedQuery.title ||
        recipe.title.toLowerCase().includes(parsedQuery.title.join(" "))) &&
      (!parsedQuery.user || parsedQuery.user.includes(recipe.user)) &&
      (!parsedQuery.tags ||
        parsedQuery.tags.every((tag: string) => recipe.tags.includes(tag))) &&
      (!parsedQuery.maxThreads ||
        recipe.threads <= Number(parsedQuery.maxThreads[0])) &&
      (!parsedQuery.time || recipe.time <= Number(parsedQuery.time[0]))
    );
  });

  return { tags, recipes };
}

export function fetchRecipe(user: string, recipeId: string): RecipeData {
  const recipes = data as Record<string, any>;
  const userData = recipes[user];
  if (!userData) throw new Error(`No data found for: ${user}`);

  const recipe: RecipeData | null = userData[recipeId];

  if (!recipe) throw new Error(`Could not find recipe: ${recipeId}`);

  return recipe;
}
const _parseQuery = (query: string) => {
  const getKeyString = (cmd: string) => {
    for (const key of Object.keys(cmds)) {
      if (cmds[key].includes(cmd)) return key;
    }
    return "";
  };

  const cmds: Record<string, any> = {
    time: ["-t", "--time"],
    maxThreads: ["-n", "--cpus"],
    user: ["-u", "--users"],
    tags: ["-c", "--cat"],
  };

  const words = query.split(" ");
  let currCmd = "title";
  let parsedQuery = {} as Record<string, any>;
  for (const word of words) {
    if (word === "") continue;
    const key = getKeyString(word);
    if (key) {
      currCmd = key;
      continue;
    }

    if (!parsedQuery[currCmd]) parsedQuery[currCmd] = [];
    parsedQuery[currCmd].push(word.toLowerCase());
  }
  return parsedQuery;
};
