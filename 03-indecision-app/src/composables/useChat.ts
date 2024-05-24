import { ref } from 'vue'
import type { ChatMessage } from "@/interfaces/chat-message.interface"
import type { YesNoResponse } from '@/interfaces/yesno-response'
import { sleep } from '@/helpers/sleep'

export const useChat = () => {
    const messages = ref<ChatMessage[]>([])

    const getResponse = async() => {
        const resp = await fetch('https://yesno.wtf/api')
        const data = (await resp.json() as YesNoResponse)

        return data
    }
      
    const onMessage = async(text: string) => {
        if (text.length === 0) return

        messages.value.push({
            id: new Date().getTime(),
            message: text,
            itsMine: true
        })

        // evaluamos si termina con simbolo de ?
        if (!text.endsWith('?')) return

        await sleep(0.5)
        const { answer, image } = await getResponse()

        messages.value.push({
            id: new Date().getTime(),
            message: answer,
            itsMine: false,
            image: image
        })
    }

    return {
        // properties
        messages,
        // methods
        onMessage, getResponse
    }
}