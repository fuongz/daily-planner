import { FI_Category } from '@/constants/query-keys'
import { useApi, useApiMutation } from '@/hooks/useApi'
import { fetcher, request } from '../Http'

export const getAllCategories = () => {
  return useApi([FI_Category], (params, token) => {
    return fetcher(params, token)
  })
}

export const createCategory = () => {
  return useApiMutation([FI_Category], (key: any, data: any, token: string) => {
    return request('POST', `/${key}`, token, data)
  })
}
