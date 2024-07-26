<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Nueva cuenta</h1>
    <form @submit.prevent="register" method="POST">
      <!-- Username Input -->
      <div class="mb-4">
        <label for="name" class="block text-gray-600">Nombre</label>
        <input
          v-model="myForm.name"
          ref="nameInputRef"
          type="text"
          id="name"
          name="name"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>
      <!-- Username Input -->
      <div class="mb-4">
        <label for="email" class="block text-gray-600">Correo</label>
        <input
          v-model="myForm.email"
          ref="emailInputRef"
          type="email"
          id="email"
          name="email"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>
      <!-- Password Input -->
      <div class="mb-4">
        <label for="password" class="block text-gray-600">Contraseña</label>
        <input
          v-model="myForm.password"
          ref="passwordInputRef"
          type="password"
          id="password"
          name="password"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>
      <!-- boton registro -->
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Crear cuenta
      </button>
    </form>
    <!-- Sign up  Link -->
    <div class="mt-6 text-blue-500 text-center">
      <RouterLink :to="{ name: 'login' }" class="hover:underline">Ya tengo cuenta, entrar.</RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';
import router from '@/router';

const authST = useAuthStore()
const toast = useToast()

// ===============================
// DATA
// ===============================
const myForm = reactive({
  name: '',
  email: '',
  password: ''
})

const nameInputRef = ref<HTMLInputElement|null>(null)
const emailInputRef = ref<HTMLInputElement|null>(null)
const passwordInputRef = ref<HTMLInputElement|null>(null)

// ===============================
// METODOS
// ===============================
const register = async() => {
  if (myForm.name === '') {
    return nameInputRef.value?.focus()
  }

  if (myForm.email === '') {
    return emailInputRef.value?.focus()
  }

  if (myForm.password.length < 3) {
    toast.warning('Contraseña muy corta')
    return passwordInputRef.value?.focus()
  }

  const { ok, message } = await authST.register(myForm.name, myForm.email, myForm.password)

  if (ok) {
    return
  }

  toast.error(message)
}
</script>