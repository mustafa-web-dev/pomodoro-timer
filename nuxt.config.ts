// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@dargmuesli/nuxt-cookie-control",
    "nuxt-vercel-analytics"
  ]
})