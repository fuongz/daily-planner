import { Box, Spinner } from '@chakra-ui/react'
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

    return isLoading && !isAuthenticated ? (
      <Box h="calc(100vh)" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" thickness="4px" speed="0.75s" emptyColor="purple.100" color="purple.500" />
      </Box>
    ) : (
      <Component {...hocProps} />
    )
  }
}
