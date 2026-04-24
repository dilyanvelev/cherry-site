import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { vAppear } from './directives/appear'

history.scrollRestoration = 'manual'

const app = createApp(App)
app.directive('appear', vAppear)
app.mount('#app')
