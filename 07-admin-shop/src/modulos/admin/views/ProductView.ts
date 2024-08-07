import { defineComponent } from "vue"

export default defineComponent({
    setup() {
        console.log('Hola mundo')


        return {
            // propiedades
            // Getters
            allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            // Actions
        }
    }
})