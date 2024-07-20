import { tesloApi } from "@/api/tesloApi"
import { isAxiosError } from "axios"
import type { RegisterResponse, User } from "../interfaces"

interface RegisterError {
    ok: false
    message: string
}

interface RegisterSuccess {
    ok: true
    user: User
    token: string
}

export const registerAction = async (
    fullName: string,
    email: string,
    password: string
): Promise<RegisterError|RegisterSuccess> => {
    try {
        const { data } = await tesloApi.post<RegisterResponse>('/auth/register', {
            fullName, email, password
        })

        console.log('data del registro', data)

        return {
            ok: true,
            user: data.user,
            token: data.token
        }
    } catch (error) {
        if ( isAxiosError(error) && error.response?.status === 400) {
            let mensaje = ''
            // saber si una variable es array
            if (Array.isArray(error.response.data.message)) {
                mensaje = error.response.data.message[0]
            } else {
                mensaje = error.response.data.message
            }

            return { ok: false, message: mensaje }
        }

        throw new Error('Error al registrar el usuario')
    }
}