export type NoteFrontmatter = {
  layout: string;
  title: string;
  description: string;
  preview: string;
  category: string;
  tags: string[];
  date: string;
  lastmod: string;
};

export type Note = {
  slug: string;
  frontmatter: NoteFrontmatter;
};
