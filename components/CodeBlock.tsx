"use client";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-children-prop */
//@ts-nocheck
import { PrismLight } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import graphql from "react-syntax-highlighter/dist/cjs/languages/prism/graphql";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";

PrismLight.registerLanguage("tsx", tsx);
PrismLight.registerLanguage("graphql", graphql);
PrismLight.registerLanguage("typescript", typescript);
PrismLight.registerLanguage("scss", scss);
PrismLight.registerLanguage("bash", bash);
PrismLight.registerLanguage("markdown", markdown);
PrismLight.registerLanguage("sql", sql);
PrismLight.registerLanguage("json", json);

export function CodeBlock({
  text,
  language,
  ...rest
}: {
  text: string | string[];
  language: string;
  [key: string]: any;
}) {
  return (
    <div className="prose -mx-2 my-6 rounded-md border border-black p-4 text-sm md:-mx-4">
      <PrismLight
        showLineNumbers={false}
        useInlineStyles={false}
        language={language}
        children={text}
      ></PrismLight>
    </div>
  );
}
