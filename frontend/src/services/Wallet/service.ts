import { FI_Wallet } from '@/constants/query-keys'
import { useApi, useApiMutation } from '@/hooks/useApi'
import { fetcher, request } from '../Http'

export const getAllWallets = () => {
  return useApi([FI_Wallet], (params, token) => {
    return fetcher(params, token)
  })
}

export const createWallet = () => {
  return useApiMutation([FI_Wallet], (key: any, data: any, token: string) => {
    return request('POST', `/${key}`, token, data)
  })
}
