import { defineComponent } from 'vue'
import { useCounter } from '../../composables/useCounter'

export default defineComponent({
    props: {
        value: {type: Number, required: true}
    },
    setup(props) {
        const { contador, squareCounter } = useCounter(props.value)

        return { contador, squareCounter }
    }
})