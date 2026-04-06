export const unquote = (text: string): string => {
  if ((text.startsWith("'") || text.startsWith('"')) && (text.endsWith("'") || text.endsWith('"'))) {
    return text.slice(1,-1);
  }
  return text;
}

export const deslugify = (text: string): string => {
  return text.replace(/-/g, " ");
};

export const slugify = (text: string): string => {
  return text.trim().toLocaleLowerCase().replace(/\s+/g, "-");
};

export const inflectNumber = (word: string, n: number): string => {
  return word + (n == 1 ? "" : "s"); // very simplistic, Aarne wouldn't be proud
}
