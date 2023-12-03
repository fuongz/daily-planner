import { Avatar, Box, Button, CheckboxGroup, Container, Flex, Grid, GridItem, HStack, Link, Spinner, Stack, Text, useCheckbox, useCheckboxGroup } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Task } from '@/components/screen/home/Task'
import { TTask } from '@/types/task'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { withAuthWrapper } from '@/components/shared/AuthWrapper'

interface HomeProps {}

const Home = (props: HomeProps) => {
  const { login, register, logout, user, isAuthenticated, getToken } = useKindeAuth()
  const defaultTasks: Array<TTask> = [
    {
      title: 'Kéo xà',
      value: 'bcc8e76f-766a-49cb-81db-102c2c71e822',
    },
    {
      title: 'Hít đất',
      value: 'a6d99aa4-9845-44cb-a01f-c2d7d9f61bb8',
    },
  ]

  const taskData = useMemo(async () => {
    console.log(await getToken())

    return defaultTasks
  }, [defaultTasks])

  return (
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

      <Text fontSize="2xl" fontWeight="bold" marginTop={4}>
        ✨ Today tasks
      </Text>

      <Flex gap={4} flexDirection="column" mt={6}>
        {taskData &&
          taskData.length > 0 &&
          taskData.map((item, index) => (
            <GridItem key={`daily-task-${index}`}>
              <Task {...item} />
            </GridItem>
          ))}
      </Flex>
    </Container>
  )
}

export default withAuthWrapper(Home)
