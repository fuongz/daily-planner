import { Spinner } from '@chakra-ui/react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { ComponentType } from 'react'

export function withAuthWrapper(Component: ComponentType) {
  return (hocProps: any) => {
    const { isAuthenticated, isLoading, getToken } = useKindeAuth()
    return isLoading && !isAuthenticated ? <Spinner my={4} /> : <Component {...hocProps} />
  }
}
