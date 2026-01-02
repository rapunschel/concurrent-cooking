export async function fetchTags() {
  const tags: string[] = ["all"].concat(
    Array.from(
      new Set(
        testData.reduce(
          (tags: string[], recipe) => tags.concat(recipe.tags),
          []
        )
      )
    )
  );

  return tags;
}

export async function fetchRecipes(tag: string) {
  return testData.filter((recipe) => recipe.tags.includes(tag));
}

export async function fetchAllRecipes() {
  return testData;
}

const testData = [
  {
    title: "Red beet soup",
    tags: ["vegetarian", "vegan"],
    cpus: 2,
    user: "harisont",
    time: 120,
  },
  {
    title: "Vegetarian dog biscuits",
    tags: ["vegetarian"],
    cpus: 3,
    user: "Alice",
    time: 50,
  },
  {
    title: "Omnivore chicken stew",
    tags: ["omnivore", "dog food"],
    cpus: 5,
    user: "Bob",
    time: 70,
  },
  {
    title: "Vegan pumpkin pudding",
    tags: ["vegan", "dessert"],
    cpus: 2,
    user: "Charlie",
    time: 40,
  },
  {
    title: "Vegetarian apple crumble",
    tags: ["vegetarian", "dessert"],
    cpus: 4,
    user: "Diana",
    time: 60,
  },
  {
    title: "Omnivore beef treats",
    tags: ["omnivore", "dog food"],
    cpus: 3,
    user: "Ethan",
    time: 50,
  },
  {
    title: "Vegan carrot cookies",
    tags: ["vegan", "dessert"],
    cpus: 1,
    user: "Alice",
    time: 30,
  },
  {
    title: "Vegetarian peanut butter bites",
    tags: ["vegetarian", "dog food"],
    cpus: 2,
    user: "Bob",
    time: 40,
  },
  {
    title: "Omnivore turkey mix",
    tags: ["omnivore", "cat food"],
    cpus: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Vegan chocolate mousse",
    tags: ["vegan", "dessert"],
    cpus: 3,
    user: "Diana",
    time: 50,
  },
  {
    title: "Vegetarian banana squares",
    tags: ["vegetarian", "dessert"],
    cpus: 4,
    user: "Ethan",
    time: 60,
  },

  {
    title: "Omnivore fish pâté",
    tags: ["omnivore", "cat food"],
    cpus: 2,
    user: "Alice",
    time: 40,
  },
  {
    title: "Vegan apple tart",
    tags: ["vegan", "dessert"],
    cpus: 1,
    user: "Bob",
    time: 30,
  },
  {
    title: "Vegetarian oat treats",
    tags: ["vegetarian", "dog food"],
    cpus: 3,
    user: "Charlie",
    time: 50,
  },
  {
    title: "Omnivore chicken jerky",
    tags: ["omnivore", "dog food"],
    cpus: 5,
    user: "Diana",
    time: 70,
  },
  {
    title: "Vegan pumpkin cookies",
    tags: ["vegan", "dessert"],
    cpus: 2,
    user: "Ethan",
    time: 40,
  },
  {
    title: "Vegetarian coconut bites",
    tags: ["vegetarian", "dessert"],
    cpus: 4,
    user: "Alice",
    time: 60,
  },
  {
    title: "Omnivore salmon chunks",
    tags: ["omnivore", "cat food"],
    cpus: 3,
    user: "Bob",
    time: 50,
  },
  {
    title: "Vegan berry cheesecake",
    tags: ["vegan", "dessert"],
    cpus: 1,
    user: "Charlie",
    time: 30,
  },
  {
    title: "Vegetarian cheese biscuits",
    tags: ["vegetarian", "dog food"],
    cpus: 5,
    user: "Diana",
    time: 70,
  },
  {
    title: "Omnivore lamb stew",
    tags: ["omnivore", "dog food"],
    cpus: 2,
    user: "Ethan",
    time: 40,
  },

  {
    title: "Vegan mango pudding",
    tags: ["vegan", "dessert"],
    cpus: 3,
    user: "Alice",
    time: 50,
  },
  {
    title: "Vegetarian apple bites",
    tags: ["vegetarian", "dog food"],
    cpus: 4,
    user: "Bob",
    time: 60,
  },
  {
    title: "Omnivore tuna mix",
    tags: ["omnivore", "cat food"],
    cpus: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Vegan chocolate truffles",
    tags: ["vegan", "dessert"],
    cpus: 1,
    user: "Diana",
    time: 30,
  },
  {
    title: "Vegetarian pumpkin treats",
    tags: ["vegetarian", "dog food"],
    cpus: 2,
    user: "Ethan",
    time: 40,
  },
  {
    title: "Omnivore chicken pâté",
    tags: ["omnivore", "cat food"],
    cpus: 3,
    user: "Alice",
    time: 50,
  },
  {
    title: "Vegan lemon bars",
    tags: ["vegan", "dessert"],
    cpus: 4,
    user: "Bob",
    time: 60,
  },
  {
    title: "Vegetarian carrot cookies",
    tags: ["vegetarian", "dog food"],
    cpus: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Omnivore beef jerky",
    tags: ["omnivore", "dog food"],
    cpus: 2,
    user: "Diana",
    time: 40,
  },
  {
    title: "Vegan strawberry tart",
    tags: ["vegan", "dessert"],
    cpus: 3,
    user: "Ethan",
    time: 50,
  },

  {
    title: "Vegetarian peanut butter cookies",
    tags: ["vegetarian", "dessert"],
    cpus: 1,
    user: "Alice",
    time: 30,
  },
  {
    title: "Omnivore salmon treats",
    tags: ["omnivore", "cat food"],
    cpus: 4,
    user: "Bob",
    time: 60,
  },
  {
    title: "Vegan chocolate cupcakes",
    tags: ["vegan", "dessert"],
    cpus: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Vegetarian banana muffins",
    tags: ["vegetarian", "dessert"],
    cpus: 2,
    user: "Diana",
    time: 40,
  },
  {
    title: "Omnivore turkey bites",
    tags: ["omnivore", "dog food"],
    cpus: 3,
    user: "Ethan",
    time: 50,
  },
  {
    title: "Vegan coconut pudding",
    tags: ["vegan", "dessert"],
    cpus: 4,
    user: "Alice",
    time: 60,
  },
  {
    title: "Vegetarian apple squares",
    tags: ["vegetarian", "dessert"],
    cpus: 1,
    user: "Bob",
    time: 30,
  },
  {
    title: "Omnivore chicken chunks",
    tags: ["omnivore", "cat food"],
    cpus: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Vegan peanut butter bars",
    tags: ["vegan", "dessert"],
    cpus: 2,
    user: "Diana",
    time: 40,
  },
  {
    title: "Vegetarian carrot squares",
    tags: ["vegetarian", "dog food"],
    cpus: 3,
    user: "Ethan",
    time: 50,
  },

  {
    title: "Omnivore fish bites",
    tags: ["omnivore", "cat food"],
    cpus: 4,
    user: "Alice",
    time: 60,
  },
  {
    title: "Vegan mango cheesecake",
    tags: ["vegan", "dessert"],
    cpus: 1,
    user: "Bob",
    time: 30,
  },
  {
    title: "Vegetarian coconut squares",
    tags: ["vegetarian", "dessert"],
    cpus: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Omnivore beef cubes",
    tags: ["omnivore", "dog food"],
    cpus: 2,
    user: "Diana",
    time: 40,
  },
  {
    title: "Vegan berry bars",
    tags: ["vegan", "dessert"],
    cpus: 3,
    user: "Ethan",
    time: 50,
  },
  {
    title: "Vegetarian pumpkin squares",
    tags: ["vegetarian", "dessert"],
    cpus: 4,
    user: "Alice",
    time: 60,
  },
  {
    title: "Omnivore turkey cubes",
    tags: ["omnivore", "dog food"],
    cpus: 5,
    user: "Bob",
    time: 70,
  },
  {
    title: "Vegan chocolate bark",
    tags: ["vegan", "dessert"],
    cpus: 2,
    user: "Charlie",
    time: 40,
  },
  {
    title: "Vegetarian apple crumble bites",
    tags: ["vegetarian", "dessert"],
    cpus: 3,
    user: "Diana",
    time: 50,
  },
  {
    title: "Omnivore salmon cubes",
    tags: ["omnivore", "cat food"],
    cpus: 4,
    user: "Ethan",
    time: 60,
  },
  {
    title: "Vegan lemon cheesecake",
    tags: ["vegan", "dessert"],
    cpus: 5,
    user: "Alice",
    time: 70,
  },
  {
    title: "Vegetarian peanut bars",
    tags: ["vegetarian", "dessert"],
    cpus: 1,
    user: "Bob",
    time: 30,
  },
];
