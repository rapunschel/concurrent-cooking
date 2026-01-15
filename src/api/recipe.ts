export async function fetchTags() {
  const tags: string[] = ["all"].concat(
    Array.from(
      new Set(
        data.reduce((tags: string[], recipe) => tags.concat(recipe.tags), [])
      )
    )
  );

  return tags;
}

export async function fetchRecipesData(
  query: string | null,
  tag: string | null
) {
  if (!tag || tag === "") tag = "all";
  const tags = await fetchTags();

  if (!tags.includes(tag)) {
    throw new Error(`Tag "${tag}" does not exist.`);
  }

  const recipesData =
    tag === "all" ? data : data.filter((recipe) => recipe.tags.includes(tag));

  const recipes = recipesData.filter((recipe) => {
    if (!query) return true;
    query = query.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.user.toLowerCase().includes(query) ||
      recipe.tags.includes(query) ||
      recipe.cpus.toString().toLowerCase().includes(query) ||
      recipe.time.toString().toLowerCase().includes(query)
    );
  });

  return { tags, recipes };
}

const data = [
  {
    title: "Red beet soup",
    tags: ["vegan", "vegetarian"],
    cpus: 2,
    user: "rapunschel",
    time: 120,
  },
  {
    title: "Dog biscuits",
    tags: ["vegetarian", "baking"],
    cpus: 3,
    user: "harisont",
    time: 50,
  },
  {
    title: "Chicken stew",
    tags: ["omnivore"],
    cpus: 5,
    user: "rapunschel",
    time: 70,
  },
  {
    title: "Pumpkin pudding",
    tags: ["vegan", "dessert"],
    cpus: 2,
    user: "harisont",
    time: 40,
  },
  {
    title: "Apple crumble",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 4,
    user: "rapunschel",
    time: 60,
  },
  {
    title: "Beef treats",
    tags: ["omnivore", "baking"],
    cpus: 3,
    user: "harisont",
    time: 50,
  },
  {
    title: "Carrot cookies",
    tags: ["vegan", "dessert", "baking"],
    cpus: 1,
    user: "rapunschel",
    time: 30,
  },
  {
    title: "Peanut butter bites",
    tags: ["vegetarian", "baking"],
    cpus: 2,
    user: "harisont",
    time: 40,
  },
  {
    title: "Turkey mix",
    tags: ["omnivore"],
    cpus: 5,
    user: "rapunschel",
    time: 70,
  },
  {
    title: "Chocolate mousse",
    tags: ["vegan", "dessert"],
    cpus: 3,
    user: "harisont",
    time: 50,
  },

  {
    title: "Banana squares",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 4,
    user: "rapunschel",
    time: 60,
  },
  {
    title: "Fish pâté",
    tags: ["omnivore"],
    cpus: 2,
    user: "harisont",
    time: 40,
  },
  {
    title: "Apple tart",
    tags: ["vegan", "dessert", "baking"],
    cpus: 1,
    user: "rapunschel",
    time: 30,
  },
  {
    title: "Oat treats",
    tags: ["vegetarian", "baking"],
    cpus: 3,
    user: "harisont",
    time: 50,
  },
  {
    title: "Chicken jerky",
    tags: ["omnivore", "baking"],
    cpus: 5,
    user: "rapunschel",
    time: 70,
  },
  {
    title: "Pumpkin cookies",
    tags: ["vegan", "dessert", "baking"],
    cpus: 2,
    user: "harisont",
    time: 40,
  },
  {
    title: "Coconut bites",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 4,
    user: "rapunschel",
    time: 60,
  },
  {
    title: "Salmon chunks",
    tags: ["omnivore"],
    cpus: 3,
    user: "harisont",
    time: 50,
  },
  {
    title: "Berry cheesecake",
    tags: ["vegan", "dessert", "baking"],
    cpus: 1,
    user: "rapunschel",
    time: 30,
  },
  {
    title: "Cheese biscuits",
    tags: ["vegetarian", "baking"],
    cpus: 5,
    user: "harisont",
    time: 70,
  },

  {
    title: "Lamb stew",
    tags: ["omnivore"],
    cpus: 2,
    user: "rapunschel",
    time: 40,
  },
  {
    title: "Mango pudding",
    tags: ["vegan", "dessert"],
    cpus: 3,
    user: "harisont",
    time: 50,
  },
  {
    title: "Apple bites",
    tags: ["vegetarian", "baking"],
    cpus: 4,
    user: "rapunschel",
    time: 60,
  },
  {
    title: "Tuna mix",
    tags: ["omnivore"],
    cpus: 5,
    user: "harisont",
    time: 70,
  },
  {
    title: "Chocolate truffles",
    tags: ["vegan", "dessert", "baking"],
    cpus: 1,
    user: "rapunschel",
    time: 30,
  },
  {
    title: "Pumpkin treats",
    tags: ["vegetarian", "baking"],
    cpus: 2,
    user: "harisont",
    time: 40,
  },
  {
    title: "Chicken pâté",
    tags: ["omnivore"],
    cpus: 3,
    user: "rapunschel",
    time: 50,
  },
  {
    title: "Lemon bars",
    tags: ["vegan", "dessert", "baking"],
    cpus: 4,
    user: "harisont",
    time: 60,
  },
  {
    title: "Beef jerky",
    tags: ["omnivore", "baking"],
    cpus: 2,
    user: "rapunschel",
    time: 40,
  },
  {
    title: "Strawberry tart",
    tags: ["vegan", "dessert", "baking"],
    cpus: 3,
    user: "harisont",
    time: 50,
  },

  {
    title: "Peanut butter cookies",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 1,
    user: "rapunschel",
    time: 30,
  },
  {
    title: "Salmon treats",
    tags: ["omnivore"],
    cpus: 4,
    user: "harisont",
    time: 60,
  },
  {
    title: "Chocolate cupcakes",
    tags: ["vegan", "dessert", "baking"],
    cpus: 5,
    user: "rapunschel",
    time: 70,
  },
  {
    title: "Banana muffins",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 2,
    user: "harisont",
    time: 40,
  },
  {
    title: "Turkey bites",
    tags: ["omnivore"],
    cpus: 3,
    user: "rapunschel",
    time: 50,
  },
  {
    title: "Coconut pudding",
    tags: ["vegan", "dessert"],
    cpus: 4,
    user: "harisont",
    time: 60,
  },
  {
    title: "Apple squares",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 1,
    user: "rapunschel",
    time: 30,
  },
  {
    title: "Chicken chunks",
    tags: ["omnivore"],
    cpus: 5,
    user: "harisont",
    time: 70,
  },
  {
    title: "Peanut butter bars",
    tags: ["vegan", "dessert", "baking"],
    cpus: 2,
    user: "rapunschel",
    time: 40,
  },
  {
    title: "Carrot squares",
    tags: ["vegetarian", "baking"],
    cpus: 3,
    user: "harisont",
    time: 50,
  },

  {
    title: "Fish bites",
    tags: ["omnivore"],
    cpus: 4,
    user: "rapunschel",
    time: 60,
  },
  {
    title: "Mango cheesecake",
    tags: ["vegan", "dessert", "baking"],
    cpus: 1,
    user: "harisont",
    time: 30,
  },
  {
    title: "Coconut squares",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 5,
    user: "rapunschel",
    time: 70,
  },
  {
    title: "Beef cubes",
    tags: ["omnivore"],
    cpus: 2,
    user: "harisont",
    time: 40,
  },
  {
    title: "Berry bars",
    tags: ["vegan", "dessert", "baking"],
    cpus: 3,
    user: "rapunschel",
    time: 50,
  },
  {
    title: "Pumpkin squares",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 4,
    user: "harisont",
    time: 60,
  },
  {
    title: "Turkey cubes",
    tags: ["omnivore"],
    cpus: 5,
    user: "rapunschel",
    time: 70,
  },
  {
    title: "Chocolate bark",
    tags: ["vegan", "dessert", "baking"],
    cpus: 2,
    user: "harisont",
    time: 40,
  },
  {
    title: "Apple crumble bites",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 3,
    user: "rapunschel",
    time: 50,
  },
  {
    title: "Salmon cubes",
    tags: ["omnivore"],
    cpus: 4,
    user: "harisont",
    time: 60,
  },

  {
    title: "Lemon cheesecake",
    tags: ["vegan", "dessert", "baking"],
    cpus: 5,
    user: "rapunschel",
    time: 70,
  },
  {
    title: "Peanut bars",
    tags: ["vegetarian", "dessert", "baking"],
    cpus: 1,
    user: "harisont",
    time: 30,
  },
];
