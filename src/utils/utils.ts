export const deslugify = (text: string): string => {
  return text.replace(/-/g, " ");
};

export const slugify = (text: string): string => {
  return text.trim().toLocaleLowerCase().replace(/\s+/g, "-");
};
