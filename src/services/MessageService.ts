import { Message } from "@prisma/client"
import ApiService from "./ApiService"


export async function apiGetMessageChatsByConversationCode(param: Message) {
    return ApiService.fetchData({
        method: 'get',
        url: `/api/message/${param.conversationCode}`,
    })
}


export async function apiCreateMessageChat(param: Message) {
    return ApiService.fetchData({
        method: 'post',
        url: '/api/message',
        param
    })
}

export async function apiCreateMessageChatBot(param: Message) {
    return ApiService.fetchData({
        method: 'post',
        url: '/api/messagebot',
        param
    })
}
