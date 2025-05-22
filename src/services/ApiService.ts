import axios from "axios"

interface apiservice {
    method: string,
    url: string,
    param?: any
}

const ApiService = {
    fetchData({
        method,
        url,
        param
    }: apiservice) {
        return new Promise((resolve, reject) => {
            axios({
                method,
                url,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: param
            }).then(response => {
                resolve(response.data)
            }).catch(errors => {
                reject(errors)
            })
        })
    }
}

export default ApiService