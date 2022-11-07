import { ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

export default function usePizzas() {
    const pizzas = ref([])
    const pizza = ref([])
    const pizzaToppings = ref([])
    const router = useRouter()
    const errors = ref('')

    const getPizzas = async () => {
        let response = await axios.get('/api/pizzas')
        pizzas.value = response.data.data;
    }

    const getPizza = async (id) => {
        let response = await axios.get('/api/pizzas/' + id)
        pizza.value = response.data.data;
    }

    const storePizza = async (data) => {
        console.log(data);
        errors.value = ''
        try {
            await axios.post('/api/pizzas', data)
            await router.push({name: 'pizzas.index'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updatePizza = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/pizzas/' + id, pizza.value)
            await router.push({name: 'pizzas.index'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    const destroyPizza = async (id) => {
        await axios.delete('/api/pizzas/' + id)
    }

    const getPizzaToppings = async (id) => {
        let response = await axios.get('/api/pizza/' + id + '/toppings')
        pizza.value.toppings = response.data;
    }


    return {
        pizzas,
        pizza,
        errors,
        pizzaToppings,
        getPizzas,
        getPizza,
        storePizza,
        updatePizza,
        destroyPizza,
        getPizzaToppings,
    }
}
