import { Conversation } from "@prisma/client"
import ApiService from "./ApiService"


export async function apiGetConversations() {
    return ApiService.fetchData({
        method: 'get',
        url: '/api/conversation',
    })
}


export async function apiCreateConversation(param: Conversation) {
    return ApiService.fetchData({
        method: 'post',
        url: '/api/conversation',
        param
    })
}



export async function apiDeleteConversation(param: Conversation) {
    return ApiService.fetchData({
        method: 'delete',
        url: '/api/conversation',
        param
    })
}


export async function apiUpdateConversation(param: Conversation) {
    return ApiService.fetchData({
        method: 'put',
        url: '/api/conversation',
        param
    })
}