import { tesloApi } from "@/api/tesloApi"

export const loginAction = async() => {
    try {
        const resp = await tesloApi.post('/auth/login')
    } catch (error) {
        console.log(error)
    }
}