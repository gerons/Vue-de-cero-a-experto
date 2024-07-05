<template>
    <dialog class="modal" :open="open">
        <div class="modal-box">
            <h3 class="text-lg font-bold">{{ titulo }}</h3>
            <p class="py-4" v-if="subtitulo">{{ subtitulo }}</p>
            
            <div class="modal-action flex flex-col">
                <form method="dialog" @submit.prevent="submitValue">
                    <input
                        v-model="inputValue"
                        ref="inputRef"
                        type="text"
                        :placeholder="placeholder ?? 'Ingrese un valor'"
                        class="input input-bordered input-primary w-full flex-1"
                    >

                    <div class="flex justify-end mt-5">
                        <button type="submit" class="btn btn-primary mr-2">Aceptar</button>
                        <button class="btn btn-ghost" @click="cerrar">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </dialog>

    <div
        v-if="open" 
        class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 w-screen h-screen"
    ></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
    open: boolean
    placeholder: string
    titulo?: string
    subtitulo?: string
}

defineProps<Props>()
const emit = defineEmits<{
    close: [void]
    value: [text: string]
}>()

// ===============================
// DATA
// ===============================
const inputValue = ref('')
// referencia de componentes
const inputRef = ref<HTMLInputElement | null>(null)

// ===============================
// METODOS
// ===============================
const submitValue = () => {
    if (!inputValue.value) {
        inputRef.value?.focus()

        return
    }

    emit('value', inputValue.value.trim())
    emit('close')

    inputValue.value = ''
}

const cerrar = () => {
    emit('close')
}
</script>