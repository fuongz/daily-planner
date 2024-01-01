import { TASK } from '@/constants/query-keys'
import { useApi, useApiMutation } from '@/hooks/useApi'
import { fetcher, request } from '../Http/service'

export const getAllTasks = () => {
  return useApi([TASK], (params, token) => {
    return fetcher(params, token)
  })
}

export const createTask = () => {
  return useApiMutation([TASK], (key: any, data: any, token: string) => {
    return request('POST', `/${TASK}`, token, data)
  })
}
