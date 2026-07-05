import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

const mdxComponents = {
  code: ({ className, children, ...props }: ComponentProps<"code">) => {
    const isDiff = className?.includes("diff") || className?.includes("language-diff");
    return (
      <code
        className={`${className ?? ""} ${
          isDiff
            ? "rounded border border-transparent px-0 py-0 text-[#3FB950]"
            : "rounded bg-[var(--color-bg-elevated)] px-1 py-0.5"
        }`.trim()}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }: ComponentProps<"pre">) => (
    <pre className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 text-sm leading-7 text-[var(--color-text)]">
      {children}
    </pre>
  ),
  p: ({ children }: ComponentProps<"p">) => <p className="text-sm leading-7 text-[var(--color-text-muted)]">{children}</p>,
  ul: ({ children }: ComponentProps<"ul">) => <ul className="ml-5 list-disc space-y-2 text-sm leading-7 text-[var(--color-text-muted)]">{children}</ul>,
  strong: ({ children }: ComponentProps<"strong">) => <strong className="font-semibold text-[var(--color-text)]">{children}</strong>,
  a: ({ children, href }: ComponentProps<"a">) => (
    <a href={href} className="text-[var(--color-accent)] underline underline-offset-4">
      {children}
    </a>
  ),
};

type LogBodyProps = {
  source: string;
};

export function LogBody({ source }: LogBodyProps) {
  return (
    <div className="prose prose-invert max-w-none prose-p:text-[var(--color-text-muted)] prose-a:text-[var(--color-accent)] prose-code:text-[var(--color-text)]">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
