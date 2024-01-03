import { FI_Transaction } from '@/constants/query-keys'
import { useApi, useApiMutation } from '@/hooks/useApi'
import { fetcher, request } from '../Http'

export const getAllTransactions = () => {
  return useApi([FI_Transaction], (params, token) => {
    return fetcher(params, token)
  })
}

export const createTransaction = () => {
  return useApiMutation([FI_Transaction], (key: any, data: any, token: string) => {
    return request('POST', `/${key}`, token, data)
  })
}
