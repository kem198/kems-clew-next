export type NoteFrontmatter = {
  title: string;
  description: string;
  preview: string;
  tags: string[];
  date: string;
  lastmod: string;
};

export type Note = {
  slug: string;
  frontmatter: NoteFrontmatter;
};
