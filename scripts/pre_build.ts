import fs from "fs";
import yaml from "js-yaml";
import path from "path";

type ApprovedUsers = {
  users: string[];
};
const getRepoContents = (user: string) => {
  return `https://api.github.com/repos/${user}/concurrent-recipes/contents`;
};
const main = async (user: string) => {
  try {
    const filePath = path.resolve("public", "approved_users.yml");
    const writeToPath = `public/recipes/${user}.json`;
    const fileContents = fs.readFileSync(filePath, "utf8");
    const users = (yaml.load(fileContents) as ApprovedUsers).users;

    if (!users.includes(user)) {
      console.log("User not approved");
      return;
    }

    const res = await fetch(getRepoContents(user), {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!res.ok) {
      console.log(`Failed to fetch repo data for user: ${user}`);
      return;
    }

    const dataJson = await res.json();
    const recipes = await Promise.all(
      dataJson.map(async (obj: any) => {
        const res = await fetch(obj.download_url);
        if (!res.ok) {
          console.log(
            `Failed to fetch from user ${user} url: ${obj.download_url}`
          );
        } else if (!(obj.path === "recipe-template.md")) {
          return await res.text();
        }
      })
    );

    const data = { [user]: recipes.filter(Boolean) };
    fs.writeFileSync(writeToPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.log(e);
  }
};

const args = process.argv.slice(2);

await main(args[0]);
