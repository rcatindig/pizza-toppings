<template>
    <div v-if="errors">
      <div v-for="(v, k) in errors" :key="k" class="bg-red-500 text-white rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
        <p v-for="error in v" :key="error" class="text-sm">
          {{ error }}
        </p>
      </div>
    </div>
    <form class="space-y-6" v-on:submit.prevent="savePizza">
        <div class="space-y-4 rounded-md shadow-sm">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <div class="mt-1">
                    <input type="text" name="name" id="name"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="pizza.name">
                </div>
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <div class="mt-1">
                    <input type="text" name="description" id="description"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="pizza.description">
                </div>
            </div>
            <div>
                <label for="toppings" class="block text-sm font-medium text-gray-700">Select Topping(s)</label>
                
           
                <select id="toppings" class="form-select" multiple aria-label="select example" name="toppings" v-model="pizza.toppings">
                    <option>Open this select menu</option>
                    <option v-for="topping in toppings" :key="topping.id" :value="topping.id" >{{ topping.name }}</option>
                </select>
            </div>
        </div>

        <button type="submit"
                class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
            Save
        </button>
    </form>
</template>

<script>
import usePizzas from "../../composables/pizzas";
import {onMounted, reactive, defineEmits, defineComponent} from "vue";
import useToppings from '../../composables/toppings';
import VueMultiselect  from 'vue-multiselect'


export default  {
    components: { VueMultiselect   },
    
    data () {
            return {
                selected: null,

            }
        },
    props: {
        id: {
            required: true,
            type: String
        },
        selectedTag: {
            type: Array
        }
    },

    watch: {

       

    },

    

    setup(props,) {

       

        


        const { errors, pizza, pizzaToppings, getPizza, updatePizza, getPizzaToppings } = usePizzas()
        const { toppings, toppingOptions, getToppings, getToppingOptions } = useToppings()

        onMounted(getPizza(props.id))
        onMounted(getToppings)
        onMounted(getToppingOptions)
        onMounted(getPizzaToppings(props.id))

        console.log(pizzaToppings);

        // this.options = toppingOptions;

        const savePizza = async () => {
            await updatePizza(props.id)
        }

        const unselectTopping = (value, id) => {
            console.log(pizza)
            console.log(value);
        }


        return {
            errors,
            pizza,
            toppings,
            savePizza,
            toppingOptions,
            // selected,
            pizzaToppings,
            unselectTopping
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>