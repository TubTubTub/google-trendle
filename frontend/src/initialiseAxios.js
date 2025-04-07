import axios from 'axios'

const initialiseAxios = () => {
    axios.interceptors.request.use(async (req) => {
        if (req.method == 'post') {
            req.data['authKey'] = import.meta.env.VITE_BACKEND_AUTH_KEY
            console.debug(`Appending authorisation key to POST request: ${import.meta.env.VITE_BACKEND_AUTH_KEY}`)
        }
        return req
    }, (error) => {
        return Promise.reject(error)
    })
}

export default initialiseAxios