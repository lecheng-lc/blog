import axios from 'axios'
import { message } from 'ant-design-vue'
const service = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 * 2 
})
const MESSAGE_ID = 'REQUEST_ERROR'

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 200) {
      console.log(res)
      message.error({
        key:MESSAGE_ID,
        content: () => res.message,
        class: 'custom-class',
        style: {
          marginTop: '40vh',
        },
      })
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        // to re-login
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    let errorMsg = error.message;
    if (error.response && error.response.data && error.response.data.message) {
      errorMsg = error.response.data.message;
    }
    // 网络错误把异常抛到前面
    if (errorMsg == "Network Error" || errorMsg == "Request failed with status code 502") {
      return {
        status: 500,
        message: 'Network Error'
      }
    } else {
      return Promise.reject(error)
    }
  }
)


export default service