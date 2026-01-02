export type RecipeLoaderType = {
  selectedTag: string;
  tags: string[];
  recipes: RecipeMetaData[];
};

export type RecipeMetaData = {
  title: string;
  tags: string[];
  cpus: number;
  user: string;
  time: number;
};
