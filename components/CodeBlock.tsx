"use client";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-children-prop */
//@ts-nocheck
import { PrismAsyncLight } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import graphql from "react-syntax-highlighter/dist/esm/languages/prism/graphql";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";

PrismAsyncLight.registerLanguage("tsx", tsx);
PrismAsyncLight.registerLanguage("go", go);
PrismAsyncLight.registerLanguage("graphql", graphql);
PrismAsyncLight.registerLanguage("typescript", typescript);
PrismAsyncLight.registerLanguage("scss", scss);
PrismAsyncLight.registerLanguage("bash", bash);
PrismAsyncLight.registerLanguage("markdown", markdown);
PrismAsyncLight.registerLanguage("sql", sql);
PrismAsyncLight.registerLanguage("json", json);

export function CodeBlock({
  text,
  language,
  className,
  ...rest
}: {
  text: string | string[];
  language: string;
  className: string;
  [key: string]: any;
}) {
  const match = /language-(\w+)/.exec(className || "");

  return (
    <PrismAsyncLight
      className="overflow-auto rounded bg-neutral-700  p-2  text-xs leading-normal text-neutral-200 md:p-4"
      showLineNumbers={false}
      useInlineStyles={false}
      language={match[1]}
      children={text}
    ></PrismAsyncLight>
  );
}
