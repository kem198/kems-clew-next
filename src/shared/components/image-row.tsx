import { cn } from "@/shared/lib/cn";
import Image from "next/image";

type ImageRowProps = {
  images: string[];
  className?: string;
};

export function ImageRow({ images, className }: ImageRowProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {images.map((src, index) => (
        <div key={index} className="flex-1">
          <Image
            src={src}
            alt=""
            width={800}
            height={600}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}
