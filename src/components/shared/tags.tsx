import { ubuntuSans } from "@/constants/fonts";

// Accept either a single tag string or an array from frontmatter
type Props = {
  tags?: string | string[];
};

export function Tags({ tags }: Props) {
  const list = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
      ? [tags]
      : [];

  if (!list || list.length === 0) return <div className="not-prose" />;

  return (
    <div className="not-prose">
      <ul
        className={`${ubuntuSans.className} flex gap-2 text-sm text-gray-400`}
      >
        {list.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>
    </div>
  );
}
