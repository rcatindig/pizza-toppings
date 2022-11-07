import { ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

export default function useToppings() {
    const toppings = ref([])
    const topping = ref([])
    const toppingOptions = ref([])
    const router = useRouter()
    const errors = ref('')

    const getToppings = async () => {
        let response = await axios.get('/api/toppings')
        toppings.value = response.data.data;
    }

    const getToppingOptions = async () => {
        let response = await axios.get('/api/toppings')
        let results = response.data.data;

        let options = [];

        results.forEach(function(res) {
            let opt = {
                name: res.name,
                value: res.id,
            }

            options.push(opt)
        });

        // return options;
        toppingOptions.value = options;
    }

    const getTopping = async (id) => {
        let response = await axios.get('/api/toppings/' + id)
        topping.value = response.data.data;
    }

    const storeTopping = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/toppings', data)
            await router.push({name: 'toppings.index'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateTopping = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/toppings/' + id, topping.value)
            await router.push({name: 'toppings.index'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    const destroyTopping = async (id) => {
        await axios.delete('/api/toppings/' + id)
    }


    return {
        toppings,
        topping,
        errors,
        toppingOptions,
        getToppings,
        getTopping,
        storeTopping,
        updateTopping,
        destroyTopping,
        getToppingOptions
    }
}
