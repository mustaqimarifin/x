import { bundle } from "lightningcss";

let { code, map } = bundle({
  filename: "app/style/global.css",

  minify: true,
});
