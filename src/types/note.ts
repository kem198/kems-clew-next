export type NoteFrontmatter = {
  tags: string[];
  title: string;
  date: string;
  lastmod: string;
};

export type Note = {
  slug: string;
  frontmatter: NoteFrontmatter;
  preview: string;
};
