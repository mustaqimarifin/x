import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import db from "@astrojs/db"

//import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
/*   output: "hybrid",
  adapter: vercel({
      imageService: true,

  }), */
  site: "https://mstqmarfn.vercel.app",
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: "one-dark-pro"
    }
  },
  integrations: [mdx(), sitemap(), solidJs(), tailwind({
    applyBaseStyles: false
  }), db()]
})