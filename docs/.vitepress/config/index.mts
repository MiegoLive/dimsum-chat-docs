import { defineConfig } from 'vitepress'
import { shared } from './shared.mjs'
import { en } from './en.mjs'
import { zh } from './zh.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,
  locales: {
    root: {
      label: 'English',
      ...en
    },
    zh: {
      label: '简体中文',
      ...zh
    }
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    plugins: [
      {
        name: 'txt-utf8-charset',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.endsWith('.txt')) {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            }
            next()
          })
        },
      },
    ],
  }
})
