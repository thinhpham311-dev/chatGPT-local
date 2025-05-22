import ApiService from "./ApiService"

export async function apiPostCheckUser(param: Object) {
    return ApiService.fetchData({
        method: 'post',
        url: '/api/user',
        param
    })
}
