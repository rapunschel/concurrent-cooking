import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import getMarkdownMetadata, { getMarkdownData } from "../src/utils/parseRecipe.ts"
import { slugify } from "../src/utils/utils.ts";

type ApprovedUsers = {
  users: string[];
};
const getRepoContents = (user: string) => {
  return `https://api.github.com/repos/${user}/concurrent-recipes/contents`;
};

const main = async () => {
  const filePath = path.resolve("public", "approved_users.yml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const users = (yaml.load(fileContents) as ApprovedUsers).users;

  let data = {} as Record<string, any>;

  for (const user of users) {
    try {
      const res = await fetch(getRepoContents(user), {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (!res.ok) {
        console.log(`Failed to fetch repo data for user: ${user}`);
        continue;
      }

      const repoFiles = await res.json();
      let recipes = {} as Record<string, any>;

      for (const file of repoFiles) {
        const res = await fetch(file.download_url);
        if (!res.ok) {
          console.log(
            `Failed to fetch recipe from user ${user} url: ${file.download_url}`
          );
        } else if (
          !(file.path === "recipe-template.md" || file.path === "README.md")
        ) {
          const content = await res.text();
          try {
            const metadata = getMarkdownMetadata(content);
            getMarkdownData(content);
            metadata.user = user;

            recipes[slugify(metadata.title)] = {
              metadata: metadata,
              recipe: content,
            } as Record<string, any>;
          } catch (e) {
            console.log(e)
            console.log(`Invalid metadata. Blaming ${user}`);
          }
        }
      }
      data[user] = recipes;
    } catch (e) {
      console.log(e);
    }
  }

  fs.writeFileSync(
    `src/data/data.json`,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
};

await main();
