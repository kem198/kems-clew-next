import { SITE_NAME } from "@/constants/site";

export function withSiteName(title?: string) {
  if (!title) return SITE_NAME;
  return `${title} | ${SITE_NAME}`;
}
