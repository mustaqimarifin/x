import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
//import node from '@astrojs/node'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  site: 'https://mstqmarfn.vercel.app',
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'hybrid',
  adapter: vercel(),
})
