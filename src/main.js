
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';



import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import '../node_modules/flowbite-vue/dist/index.css'

library.add(faEdit);
const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
