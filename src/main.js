import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
// import { createPinia } from 'pinia'
import directives from '@/directives'

import './assets/main.css'

const app = createApp(App)

app.use(createHead())
// app.use(createPinia())
app.use(router)
directives(app)

app.mount('#app')
