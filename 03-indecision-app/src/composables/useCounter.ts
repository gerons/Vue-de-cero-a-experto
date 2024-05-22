import { ref, computed} from 'vue'

export const useCounter = (initialValue: number) => {
    const contador = ref(initialValue)
    // const squareCounter = computed(() => contador.value * contador.value )

    return {
        contador,

        // read-only
        squareCounter: computed(() => contador.value * contador.value )
    }
}