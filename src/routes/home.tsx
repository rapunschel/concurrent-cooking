import "./home.css";

type RecipeMetaData = {
  recipe: {
    title: string;
    tags: string[];
    threads: number;
    user: string;
    time: number;
  };
};

export default function Home() {
  const data = testData;
  return (
    <div>
      <div className="category-list">
        {/* TODO react element for categories */}
        <p style={{ backgroundColor: "rgb(160, 255, 119)" }}>All</p>
        <p style={{ backgroundColor: "rgba(245, 189, 140, 1)" }}>Cat food</p>
      </div>
      <div className="metadata">
        <p>Title</p>
        <p>User </p>
        <p>Time</p>
        <p>Tags</p>
        <p>#</p>
      </div>
      <div className="recipe-container">
        {data.map((recipe, index) => {
          return <RecipeItem key={index} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

function RecipeItem(props: RecipeMetaData) {
  const { title, tags, threads, user, time } = props.recipe;
  return (
    <>
      <div className="recipe-item">
        <p>{title}</p>
        <p>{user}</p>
        <p>{time}</p>
        <p>{tags.join(", ")}</p>
        <p>{threads}</p>
      </div>
    </>
  );
}

const testData = [
  {
    title: "Red beet soup",
    tags: ["vegetarian", "vegan"],
    threads: 2,
    user: "harisont",
    time: 120,
  },
  {
    title: "Vegetarian dog biscuits",
    tags: ["vegetarian"],
    threads: 3,
    user: "Alice",
    time: 50,
  },
  {
    title: "Omnivore chicken stew",
    tags: ["omnivore", "dog food"],
    threads: 5,
    user: "Bob",
    time: 70,
  },
  {
    title: "Vegan pumpkin pudding",
    tags: ["vegan", "dessert"],
    threads: 2,
    user: "Charlie",
    time: 40,
  },
  {
    title: "Vegetarian apple crumble",
    tags: ["vegetarian", "dessert"],
    threads: 4,
    user: "Diana",
    time: 60,
  },
  {
    title: "Omnivore beef treats",
    tags: ["omnivore", "dog food"],
    threads: 3,
    user: "Ethan",
    time: 50,
  },
  {
    title: "Vegan carrot cookies",
    tags: ["vegan", "dessert"],
    threads: 1,
    user: "Alice",
    time: 30,
  },
  {
    title: "Vegetarian peanut butter bites",
    tags: ["vegetarian", "dog food"],
    threads: 2,
    user: "Bob",
    time: 40,
  },
  {
    title: "Omnivore turkey mix",
    tags: ["omnivore", "cat food"],
    threads: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Vegan chocolate mousse",
    tags: ["vegan", "dessert"],
    threads: 3,
    user: "Diana",
    time: 50,
  },
  {
    title: "Vegetarian banana squares",
    tags: ["vegetarian", "dessert"],
    threads: 4,
    user: "Ethan",
    time: 60,
  },

  {
    title: "Omnivore fish pâté",
    tags: ["omnivore", "cat food"],
    threads: 2,
    user: "Alice",
    time: 40,
  },
  {
    title: "Vegan apple tart",
    tags: ["vegan", "dessert"],
    threads: 1,
    user: "Bob",
    time: 30,
  },
  {
    title: "Vegetarian oat treats",
    tags: ["vegetarian", "dog food"],
    threads: 3,
    user: "Charlie",
    time: 50,
  },
  {
    title: "Omnivore chicken jerky",
    tags: ["omnivore", "dog food"],
    threads: 5,
    user: "Diana",
    time: 70,
  },
  {
    title: "Vegan pumpkin cookies",
    tags: ["vegan", "dessert"],
    threads: 2,
    user: "Ethan",
    time: 40,
  },
  {
    title: "Vegetarian coconut bites",
    tags: ["vegetarian", "dessert"],
    threads: 4,
    user: "Alice",
    time: 60,
  },
  {
    title: "Omnivore salmon chunks",
    tags: ["omnivore", "cat food"],
    threads: 3,
    user: "Bob",
    time: 50,
  },
  {
    title: "Vegan berry cheesecake",
    tags: ["vegan", "dessert"],
    threads: 1,
    user: "Charlie",
    time: 30,
  },
  {
    title: "Vegetarian cheese biscuits",
    tags: ["vegetarian", "dog food"],
    threads: 5,
    user: "Diana",
    time: 70,
  },
  {
    title: "Omnivore lamb stew",
    tags: ["omnivore", "dog food"],
    threads: 2,
    user: "Ethan",
    time: 40,
  },

  {
    title: "Vegan mango pudding",
    tags: ["vegan", "dessert"],
    threads: 3,
    user: "Alice",
    time: 50,
  },
  {
    title: "Vegetarian apple bites",
    tags: ["vegetarian", "dog food"],
    threads: 4,
    user: "Bob",
    time: 60,
  },
  {
    title: "Omnivore tuna mix",
    tags: ["omnivore", "cat food"],
    threads: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Vegan chocolate truffles",
    tags: ["vegan", "dessert"],
    threads: 1,
    user: "Diana",
    time: 30,
  },
  {
    title: "Vegetarian pumpkin treats",
    tags: ["vegetarian", "dog food"],
    threads: 2,
    user: "Ethan",
    time: 40,
  },
  {
    title: "Omnivore chicken pâté",
    tags: ["omnivore", "cat food"],
    threads: 3,
    user: "Alice",
    time: 50,
  },
  {
    title: "Vegan lemon bars",
    tags: ["vegan", "dessert"],
    threads: 4,
    user: "Bob",
    time: 60,
  },
  {
    title: "Vegetarian carrot cookies",
    tags: ["vegetarian", "dog food"],
    threads: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Omnivore beef jerky",
    tags: ["omnivore", "dog food"],
    threads: 2,
    user: "Diana",
    time: 40,
  },
  {
    title: "Vegan strawberry tart",
    tags: ["vegan", "dessert"],
    threads: 3,
    user: "Ethan",
    time: 50,
  },

  {
    title: "Vegetarian peanut butter cookies",
    tags: ["vegetarian", "dessert"],
    threads: 1,
    user: "Alice",
    time: 30,
  },
  {
    title: "Omnivore salmon treats",
    tags: ["omnivore", "cat food"],
    threads: 4,
    user: "Bob",
    time: 60,
  },
  {
    title: "Vegan chocolate cupcakes",
    tags: ["vegan", "dessert"],
    threads: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Vegetarian banana muffins",
    tags: ["vegetarian", "dessert"],
    threads: 2,
    user: "Diana",
    time: 40,
  },
  {
    title: "Omnivore turkey bites",
    tags: ["omnivore", "dog food"],
    threads: 3,
    user: "Ethan",
    time: 50,
  },
  {
    title: "Vegan coconut pudding",
    tags: ["vegan", "dessert"],
    threads: 4,
    user: "Alice",
    time: 60,
  },
  {
    title: "Vegetarian apple squares",
    tags: ["vegetarian", "dessert"],
    threads: 1,
    user: "Bob",
    time: 30,
  },
  {
    title: "Omnivore chicken chunks",
    tags: ["omnivore", "cat food"],
    threads: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Vegan peanut butter bars",
    tags: ["vegan", "dessert"],
    threads: 2,
    user: "Diana",
    time: 40,
  },
  {
    title: "Vegetarian carrot squares",
    tags: ["vegetarian", "dog food"],
    threads: 3,
    user: "Ethan",
    time: 50,
  },

  {
    title: "Omnivore fish bites",
    tags: ["omnivore", "cat food"],
    threads: 4,
    user: "Alice",
    time: 60,
  },
  {
    title: "Vegan mango cheesecake",
    tags: ["vegan", "dessert"],
    threads: 1,
    user: "Bob",
    time: 30,
  },
  {
    title: "Vegetarian coconut squares",
    tags: ["vegetarian", "dessert"],
    threads: 5,
    user: "Charlie",
    time: 70,
  },
  {
    title: "Omnivore beef cubes",
    tags: ["omnivore", "dog food"],
    threads: 2,
    user: "Diana",
    time: 40,
  },
  {
    title: "Vegan berry bars",
    tags: ["vegan", "dessert"],
    threads: 3,
    user: "Ethan",
    time: 50,
  },
  {
    title: "Vegetarian pumpkin squares",
    tags: ["vegetarian", "dessert"],
    threads: 4,
    user: "Alice",
    time: 60,
  },
  {
    title: "Omnivore turkey cubes",
    tags: ["omnivore", "dog food"],
    threads: 5,
    user: "Bob",
    time: 70,
  },
  {
    title: "Vegan chocolate bark",
    tags: ["vegan", "dessert"],
    threads: 2,
    user: "Charlie",
    time: 40,
  },
  {
    title: "Vegetarian apple crumble bites",
    tags: ["vegetarian", "dessert"],
    threads: 3,
    user: "Diana",
    time: 50,
  },
  {
    title: "Omnivore salmon cubes",
    tags: ["omnivore", "cat food"],
    threads: 4,
    user: "Ethan",
    time: 60,
  },
  {
    title: "Vegan lemon cheesecake",
    tags: ["vegan", "dessert"],
    threads: 5,
    user: "Alice",
    time: 70,
  },
  {
    title: "Vegetarian peanut bars",
    tags: ["vegetarian", "dessert"],
    threads: 1,
    user: "Bob",
    time: 30,
  },
];
