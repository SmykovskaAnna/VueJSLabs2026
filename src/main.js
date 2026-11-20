import { createApp } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import'./styles.css'
import App from './App.vue'

createApp(App).component('VueDatePicker', VueDatePicker).mount('#app')
