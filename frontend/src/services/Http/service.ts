import axios, { AxiosResponse, Method } from 'axios'
const httpServiceInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const fetcher = (params: any, token: any) => {
  return httpServiceInstance
    .request({
      method: 'GET',
      url: '/tasks',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res: AxiosResponse) => (res.data.status === 1 && res.data.data ? res.data.data : []))
}

export const request = (method: Method, url: string, token: any, body = {}, params = null) => {
  return httpServiceInstance.request({
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
    data: body,
  })
}
