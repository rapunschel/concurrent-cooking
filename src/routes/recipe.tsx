import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

export async function loader({ params }) {
  // console.log(`"What are you ${params}`);
  const markdownFileContent = (
    await import(`../public/recipes/red-beet-soup.md?raw`)
  ).default;
  console.log(markdownFileContent);
  console.log("------------loaderdata----");
  return { markdownFileContent };
}

export default function Recipe() {
  const { recipe } = useLoaderData();
  const [data, setData] = useState("");

  useEffect(() => {
    const markdownFileContent = async () => {
      const res = (await import(`../public/recipes/red-beet-soup.md?raw`))
        .default;
      setData(res);
    };
    markdownFileContent();
  }, [data]);
  return (
    <>
      <p> are you empty</p>
      <p>{recipe}</p>
      <p>{data}</p>
    </>
  );
}
