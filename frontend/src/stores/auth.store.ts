import { createStore, useStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { KindeUser } from '@kinde-oss/kinde-auth-react/dist/types/state/types'

type UserData = KindeUser

type AuthStore = {
  accessToken: string | undefined
  user: UserData | undefined

  actions: {
    setAccessToken: (accessToken: string | undefined) => void
    setUser: (user: UserData | undefined) => void

    init: (accessToken: string | undefined, user: UserData | undefined) => void
    clearTokens: () => void
  }
}

const authStore = createStore<AuthStore>()(
  devtools(
    (set, get) => ({
      accessToken: undefined,
      user: undefined,

      actions: {
        setAccessToken: (accessToken: string | undefined) => {
          set({
            accessToken,
          })
        },

        setUser: (user: UserData | undefined) => {
          set({
            user,
          })
        },

        init: (accessToken: string | undefined, user: UserData | undefined) => {
          const { setAccessToken, setUser } = get().actions
          setAccessToken(accessToken)
          setUser(user)
        },

        clearTokens: () => {
          set({
            accessToken: undefined,
            user: undefined,
          })
        },
      },
    }),
    {
      name: 'auth-store',
      enabled: !import.meta.env.PROD,
    }
  )
)

// Required for zustand stores, as the lib doesn't expose this type
export type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken
const userSelector = (state: ExtractState<typeof authStore>) => state.accessToken
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions

// Getters
export const getAccessToken = () => accessTokenSelector(authStore.getState())
export const getUser = () => userSelector(authStore.getState())
export const getActions = () => actionsSelector(authStore.getState())

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStoreWithEqualityFn(authStore, selector, equalityFn)
}

// Hooks
export const useAuthAccessToken = () => useAuthStore(accessTokenSelector)
export const useAuthUser = () => useAuthStore(userSelector)
