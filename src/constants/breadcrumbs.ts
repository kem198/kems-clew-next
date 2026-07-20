export const BreadcrumbSegment = {
  notes: {
    slug: "notes",
    label: "Notes",
  },
  works: {
    slug: "works",
    label: "Works",
  },
  about: {
    slug: "about",
    label: "About",
  },
} as const;

export type BreadcrumbSegment =
  (typeof BreadcrumbSegment)[keyof typeof BreadcrumbSegment];
