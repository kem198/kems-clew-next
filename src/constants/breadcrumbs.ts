export const BreadcrumbSegment = {
  notes: {
    slug: "notes",
    label: "Notes",
  },
  tags: {
    slug: "tags",
    label: "Tags",
  },
  archives: {
    slug: "archives",
    label: "Archives",
  },
  about: {
    slug: "about",
    label: "About",
  },
} as const;

export type BreadcrumbSegment =
  (typeof BreadcrumbSegment)[keyof typeof BreadcrumbSegment];
