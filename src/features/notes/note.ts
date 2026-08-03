/**
 * 記事フロントマッターのモデル
 */
export type NoteFrontmatter = {
  tags: string[];
  title: string;
  date: string;
  lastmod: string;
};

/**
 * 一記事のモデル
 */
export type Note = {
  slug: string;
  frontmatter: NoteFrontmatter;
  preview: string;
};

/**
 * 記事タグ情報のモデル
 */
export type NoteTagSummary = {
  name: string;
  count: number;
};
