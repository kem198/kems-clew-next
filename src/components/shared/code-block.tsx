"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useRef, useState, type ComponentPropsWithoutRef } from "react";

type CodeBlockProps = ComponentPropsWithoutRef<"pre">;

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);

  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const code = preRef.current?.querySelector("code")?.textContent ?? "";

    if (!code) {
      return;
    }

    await navigator.clipboard.writeText(code);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="group relative">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:bg-zinc-900/90 group-hover:text-white group-hover:opacity-100 hover:bg-zinc-900/90 hover:text-white"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </Button>

      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
