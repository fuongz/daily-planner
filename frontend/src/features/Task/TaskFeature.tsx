import { Avatar, Box, Button, Container, Flex, GridItem, HStack, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { withAuthWrapper } from '@/components/AuthWrapper'
import { Task, CreateTask } from './components'
import { getAllTasks } from '@/services/Task'

interface TaskFeatureProps {}

const TaskFeature = ({}: TaskFeatureProps) => {
  const { login, register, logout, user, isAuthenticated } = useKindeAuth()
  const { data, isLoading } = getAllTasks()

  return (
    <>
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

        <Flex justifyContent="space-between" gap={4} alignItems="center" mt={16}>
          <Text fontSize="2xl" fontWeight="bold" marginTop={4}>
            ✨ Today tasks
          </Text>

          <CreateTask />
        </Flex>

        <Skeleton height="60px" startColor="gray.50" endColor="gray.200" isLoaded={!isLoading}>
          <Flex gap={4} flexDirection="column" mt={6}>
            {data &&
              data.length > 0 &&
              data.map((item: any, index: number) => (
                <GridItem key={`daily-task-${index}`}>
                  <Task {...item} />
                </GridItem>
              ))}
          </Flex>
        </Skeleton>
      </Container>
    </>
  )
}

export default withAuthWrapper(TaskFeature)
