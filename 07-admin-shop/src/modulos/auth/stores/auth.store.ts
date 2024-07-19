import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { loginAction } from '../actions'

export const useAuthStore = defineStore('auth', () => {
  
    // ===============================
    // DATA
    // ===============================
    const authStatus = ref<AuthStatus>(AuthStatus.Cheking)
    const user = ref<User|undefined>()
    const token = ref('')


    // ===============================
    // METODOS
    // ===============================
    const login = async(email: string, password: string) => {
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
    user, token, authStatus,
    // getters (computados)
    isCheking: computed(() => authStatus.value === AuthStatus.Cheking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    // TODO: getter para saber si es admin  no
    userName: computed(() => user.value?.fullName),
    // actions (metodos)
    login,
  }
})
