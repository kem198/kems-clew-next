import { ubuntuSans } from "@/constants/fonts";

// TODO: フロントマッターの型にする
type Props = {
  tags: string[];
};

export function Tags({ tags }: Props) {
  return (
    <div className="not-prose">
      {tags && tags.length > 0 && (
        <ul className={`${ubuntuSans.className} flex gap-2`}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
