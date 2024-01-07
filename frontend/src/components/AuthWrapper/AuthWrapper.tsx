import { Avatar, Box, Button, Container, HStack, Image, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Select, Spinner, Text, VStack } from '@chakra-ui/react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { ComponentType, useEffect, useState } from 'react'
import { getActions, getUser } from '@/stores/index'
import { getAllWallets } from '@/services/Wallet'
import { IWallet } from '@/types/wallet'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const { data } = getAllWallets()
  const { user, logout } = useKindeAuth()

  return (
    <HStack mt={4} justifyContent="flex-end" gap={6}>
      {!!data && data.length > 0 && (
        <Box mr="auto">
          <Select w={100}>
            {data.map((wallet: IWallet) => (
              <option key={wallet._id} value={wallet._id}>
                {wallet.name}
              </option>
            ))}
          </Select>
        </Box>
      )}
      <Menu>
        <MenuButton as={Avatar} cursor="pointer" size="sm" src={user?.picture || ''} />
        <MenuList>
          <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )
}

export function withAuthWrapper(Component: ComponentType) {
  return (hocProps: any) => {
    const { isAuthenticated, isLoading, user, getToken, register, login } = useKindeAuth()
    const { setAccessToken, setUser } = getActions()
    const [loggingIn, setLoggingIn] = useState(false)
    const [signingUp, setSigningUp] = useState(false)

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
      <Container maxW="container.xl">
        {isAuthenticated ? (
          <>
            <Navigation />
            <Box mt={4}>
              <Component {...hocProps} />
            </Box>
          </>
        ) : (
          <VStack h="calc(100vh)" alignContent="center" justifyContent="center" gap={2}>
            <Image src="/assets/images/icon-empty-box.png" />

            <Text fontSize="xl" fontWeight={500} textAlign="center">
              Welcome to Finance Tracker
            </Text>

            <Text color="gray.400">Please login to your account to continue!</Text>

            <HStack gap={4} mt={4}>
              <Button
                isLoading={loggingIn}
                colorScheme="gray"
                onClick={() => {
                  login()
                  setLoggingIn(true)
                }}
              >
                Login
              </Button>

              <Button
                isLoading={signingUp}
                onClick={() => {
                  register()
                  setSigningUp(true)
                }}
              >
                Start for free
              </Button>
            </HStack>
          </VStack>
        )}
      </Container>
    )
  }
}
