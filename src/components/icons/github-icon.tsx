import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt">;

export function GitHubIcon({ className, ...props }: Props) {
  return (
    <Image
      src="/assets/icons/github.svg"
      alt="GitHub"
      width={24}
      height={24}
      className={className}
      {...props}
    />
  );
}

export default GitHubIcon;
