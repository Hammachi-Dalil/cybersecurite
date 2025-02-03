// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }, 
  css: [
    '@/assets/scss/main.scss'
  ],
  plugins: ['~/plugins/supabase.ts'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/foundations/variables" as *;
            @use "@/assets/scss/foundations/functions" as *;
            @use "@/assets/scss/foundations/mixins" as *;
          `,
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

})
