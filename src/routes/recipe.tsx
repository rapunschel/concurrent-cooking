import { useEffect, useState } from "react";

export default function Recipe() {
  const [recipe, setData] = useState("");

  useEffect(() => {
    const markdownFileContent = async () => {
      const res = (await import(`../recipes/red-beet-soup.md?raw`))
        .default;
      setData(res);
    };
    markdownFileContent();
  }, [recipe]);
  return (
    <>
      <p>{recipe}</p>
    </>
  );
}
