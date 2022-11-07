import { createRouter, createWebHistory } from "vue-router";

import PizzasIndex from '../components/pizzas/PizzasIndex'
import PizzasCreate from '../components/pizzas/PizzasCreate'
import PizzasEdit from '../components/pizzas/PizzasEdit'

import ToppingsIndex from '../components/toppings/ToppingsIndex'
import ToppingsCreate from '../components/toppings/ToppingsCreate'
import ToppingsEdit from '../components/toppings/ToppingsEdit'

const routes = [
    {
        path: '/pizzas',
        name: 'pizzas.index',
        component: PizzasIndex
    },
    {
        path: '/pizzas/create',
        name: 'pizzas.create',
        component: PizzasCreate
    },
    {
        path: '/pizzas/:id/edit',
        name: 'pizzas.edit',
        component: PizzasEdit,
        props: true
    },
    {
        path: '/toppings',
        name: 'toppings.index',
        component: ToppingsIndex
    },
    {
        path: '/toppings/create',
        name: 'toppings.create',
        component: ToppingsCreate
    },
    {
        path: '/toppings/:id/edit',
        name: 'toppings.edit',
        component: ToppingsEdit,
        props: true
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
