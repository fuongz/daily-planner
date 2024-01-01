import { Avatar, Box, Button, Container, HStack, Spinner, Text } from '@chakra-ui/react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { ComponentType, useEffect } from 'react'
import { getActions, getUser } from '@/stores/index'

export function withAuthWrapper(Component: ComponentType) {
  return (hocProps: any) => {
    const { isAuthenticated, isLoading, user, getToken, logout, register, login } = useKindeAuth()
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
      <Container>
        {isAuthenticated ? (
          <HStack mt={4} justifyContent="flex-end" gap={4}>
            {!!user?.picture && <Avatar size="sm" src={user?.picture} />}
            <Text>
              {user?.given_name} {user?.family_name}
            </Text>
            <Button onClick={() => logout()} colorScheme="red">
              Logout
            </Button>
          </HStack>
        ) : (
          <HStack mt={4} justifyContent="flex-end" gap={6}>
            <Text cursor="pointer" onClick={() => login()}>
              Login
            </Text>

            <Button onClick={() => register()} colorScheme="purple">
              Start for free
            </Button>
          </HStack>
        )}

        <Component {...hocProps} />
      </Container>
    )
  }
}
