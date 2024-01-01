import { ChakraProvider } from '@chakra-ui/react'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import { useRoutes } from 'react-router-dom'

import '@fontsource-variable/jetbrains-mono'

import routes from './routes'
import theme from './theme'

export default function App() {
  const rootRoutes = useRoutes(routes)

  return (
    <KindeProvider
      isDangerouslyUseLocalStorage
      clientId={import.meta.env.VITE_KINDLE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDLE_DOMAIN}
      redirectUri={import.meta.env.VITE_KINDLE_REDIRECT_URL}
      logoutUri={import.meta.env.VITE_KINDLE_LOGOUT_URL}
      scope="openid profile email offline"
    >
      <ChakraProvider theme={theme}>{rootRoutes}</ChakraProvider>
    </KindeProvider>
  )
}
