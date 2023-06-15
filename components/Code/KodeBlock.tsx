"use client";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-css.min.js";
import "prismjs/components/prism-xml-doc.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-markdown.min.js";
import "prismjs/components/prism-sql.min.js";
import "prismjs/components/prism-go.min.js";
import "prismjs/components/prism-graphql.min.js";
import "app/style/oneLight.css";

export default function KodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const prismLanguage = languages[language];
  return (
    <pre className="overflow-auto rounded bg-neutral-900    p-2  text-xs leading-normal text-neutral-200 md:p-4">
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
