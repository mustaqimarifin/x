"use client";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-json";
import "prismjs/components/prism-reason";
import "prismjs/components/prism-typescript";
import "../app/prism.css";

export function HighlightedCode({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const prismLanguage = languages[language];
  return (
    <pre className="overflow-auto rounded bg-neutral-700  p-2  text-xs leading-normal text-neutral-200 md:p-4">
      {prismLanguage !== undefined ? (
        <code
          dangerouslySetInnerHTML={{
            __html: highlight(code, prismLanguage, language),
          }}
        />
      ) : (
        <code>{code}</code>
      )}
    </pre>
  );
}
