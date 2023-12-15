import { Spinner } from '@chakra-ui/react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { ComponentType, useEffect } from 'react'
import { getActions, getUser } from '@/stores/index'

export function withAuthWrapper(Component: ComponentType) {
  return (hocProps: any) => {
    const { isAuthenticated, isLoading, user, getToken } = useKindeAuth()
    const { setAccessToken, setUser } = getActions()

    useEffect(() => {
      const setAuth = async () => {
        if (user && !getUser()) {
          setUser(user)
          const token = await getToken()
          setAccessToken(token)
        }
      }
      setAuth()
    }, [user])

    return isLoading && !isAuthenticated ? <Spinner my={4} /> : <Component {...hocProps} />
  }
}
