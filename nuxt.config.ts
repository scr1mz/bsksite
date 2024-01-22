export default defineNuxtConfig({
  //Серверный рендеринг
  ssr: true,

  head: {
    title: 'bsksite',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Описание вашего сайта' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Глобальные CSS файлы
  css: [
    '~/assets/styles/main.scss'
  ],

  // Плагины для запуска до монтирования приложения
  plugins: [
  ],

  // Автоматический импорт компонентов
  components: true,

  // Модули Nuxt
  modules: [
  ],

  // Настройки сборки
  build: {

  }
})

