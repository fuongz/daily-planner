import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export function useApi<TQueryKey extends [string, Record<string, unknown>?], TQueryFnData, TError, TData = TQueryFnData>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[0], token: string | undefined) => Promise<TQueryFnData>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) {
  const { getToken } = useKindeAuth()
  return useQuery({
    queryKey,
    queryFn: async () => {
      const token = await getToken()
      return fetcher(queryKey[0], token)
    },
    retry: false,
    ...options,
  })
}

export function useApiMutation(mutationKey: any, fetcher: any, options?: any) {
  const { getToken } = useKindeAuth()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey,
    mutationFn: async (data: any) => {
      const token = await getToken()
      return fetcher(mutationKey[0], data, token)
    },
    onSuccess: (data: AxiosResponse) => {
      if (data.status === 200 || data.status === 201) {
        queryClient.invalidateQueries({ queryKey: [mutationKey] })
      }
    },
    ...options,
  })
}
