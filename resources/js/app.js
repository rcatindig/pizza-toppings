require('./bootstrap');

require('alpinejs');

import { createApp } from "vue";
import router from './router'
import PizzasIndex from './components/pizzas/PizzasIndex'

createApp({
    components: {
        PizzasIndex
    }
}).use(router).mount('#app')
