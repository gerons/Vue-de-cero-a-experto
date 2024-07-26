<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Login</h1>
    <form @submit.prevent="onLogin" method="POST">
      <!-- email Input -->
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
        <label for="password" class="block text-gray-600">Constraseña</label>
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
      <!-- Remember Me Checkbox -->
      <div class="mb-4 flex items-center">
        <input
          v-model="myForm.rememberMe"
          type="checkbox" id="remember" name="remember" class="text-blue-500" />
        <label for="remember" class="text-gray-600 ml-2">Recordarme <i class="fas fa-users"></i></label>
      </div>
      <!-- Forgot Password Link -->
      <div class="mb-6 text-blue-500">
        <a href="#" class="hover:underline">¿Olvidaste tu contraseña?</a>
      </div>
      <!-- Login Button -->
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Ingresar
      </button>
    </form>
    <!-- Sign up  Link -->
    <div class="mt-6 text-blue-500 text-center">
      <RouterLink :to="{ name: 'register' }" class="hover:underline">Crear cuenta</RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const authST = useAuthStore()
const toast = useToast()
const router = useRouter()

// ===============================
// DATA
// ===============================
const myForm = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const emailInputRef = ref<HTMLInputElement|null>(null)
const passwordInputRef = ref<HTMLInputElement|null>(null)

watchEffect(() => {
  const email = localStorage.getItem('email')

  if (email) {
    myForm.email = email
    myForm.rememberMe = true
    passwordInputRef.value?.focus()
  }
})

// ===============================
// METODOS
// ===============================

const onLogin = async() => {
  if (myForm.email === '') {
    return emailInputRef.value?.focus()
  }

  if (myForm.password.length < 6) {
    toast.warning('Contraseña muy corta')
    return passwordInputRef.value?.focus()
  }
  
  const ok = await authST.login(myForm.email, myForm.password)

  if (ok) {
    if (myForm.rememberMe) {
      localStorage.setItem('email', myForm.email)
    } else {
      localStorage.removeItem('email')
    }

    router.push('/')

    return
  }

  toast.error('Usuarios o contraseña incorrectos.')
};

// ===============================
// CICLO DE VIDA
// ===============================

</script>
