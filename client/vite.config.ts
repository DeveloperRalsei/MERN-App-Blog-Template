import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkSlug from 'remark-slug'
import remarkAutoLinkHeading from 'remark-autolink-headings'
import rehypeAutolinkHeadings from 'remark-autolink-headings'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkSlug, remarkAutoLinkHeading] as any,
      rehypePlugins: [rehypeAutolinkHeadings] as any
    }), 
  ]
})
