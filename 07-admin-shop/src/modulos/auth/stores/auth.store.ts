import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { loginAction, registerAction } from '../actions'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  // ===============================
  // DATA
  // ===============================
  const authStatus = ref<AuthStatus>(AuthStatus.Cheking)
  const user = ref<User | undefined>()
  const token = ref( useLocalStorage('token', '') )

  // ===============================
  // METODOS
  // ===============================
  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password)

      if (!loginResp.ok) {
        logout()
        return false
      }

      user.value = loginResp.user
      token.value = loginResp.token
      authStatus.value = AuthStatus.Authenticated

      return true
    } catch (error) {
      logout()
    }
  }

  const register = async(name: string, email: string, password: string) => {
    try {
        const regResp = await registerAction(name, email, password)

        if (!regResp.ok) {
            logout()
            
            return { ok: false, message: regResp.message}
        }

        user.value = regResp.user
        token.value = regResp.token
        authStatus.value = AuthStatus.Authenticated
        
        return { ok: true, message: ''}
    } catch (error) {
        return { ok: false, message: 'Error al registrar el usuario'}
    }
  }

  const logout = () => {
    authStatus.value = AuthStatus.UnAuthenticated
    user.value = undefined
    token.value = ''

    return false
  }

  // ===============================
  // COMPUTADOS
  // ===============================

  return {
    // estados
    user,
    token,
    authStatus,
    // getters (computados)
    isCheking: computed(() => authStatus.value === AuthStatus.Cheking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    // TODO: getter para saber si es admin  no
    userName: computed(() => user.value?.fullName),
    // actions (metodos)
    login, register
  }
})
