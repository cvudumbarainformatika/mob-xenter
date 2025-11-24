import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getLocalToken } from 'src/utility/storrage'

// const SERV = 'http://192.168.101.79/api.laborat/public'
// const SERV = 'http://api.laborat.test'
const SERV = 'https://xenter.my.id'
// const SERV = 'http://192.168.150.103:3501'
// const SERV = 'http://192.168.101.80/api.laborat/public'
// const SERV = 'http://192.168.150.103:3501'
// const SERV = 'http://localhost:8080'
// const SERV = 'https://rsudmochsaleh.my.id'
// const SERV = 'http://192.168.150.112:3501' // IP RSUD Moch Saleh

const SERVER = SERV + '/api'
const api = axios.create({ baseURL: SERVER })
api.defaults.headers.get.Accepts = 'application/json'

api.defaults.headers.common.Authorization = `Bearer ${getLocalToken()}`

const interceptResErrors = (err) => {
  try {
    console.log(err.response)
  } catch (e) {
    console.log('1. catch', e)
  }
  return Promise.reject(err)
}

const interceptResponse = (res) => {
  try {
    return Promise.resolve(res)
  } catch (e) {
    console.log('2. catch interceptResponse', res)
    return Promise.resolve(res)
  }
}

api.interceptors.response.use(interceptResponse, interceptResErrors)

const interceptReqErrors = err => Promise.reject(err)
const interceptRequest = (config) => {
  return config
}
api.interceptors.request.use(interceptRequest, interceptReqErrors)

const pathImg = SERV + '/storage/'

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
const deleteToken = () => delete api.defaults.headers.common.Authorization

export { api, pathImg, setToken, deleteToken }
