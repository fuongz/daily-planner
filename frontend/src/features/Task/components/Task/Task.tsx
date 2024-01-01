import { TTask } from '@/types/task'
import { Box, Checkbox, Flex, Stack, Text, UseCheckboxProps, VStack, useCheckbox } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { MouseEventHandler, useCallback, useMemo, useState } from 'react'

const Task: React.FC<TTask> = (props) => {
  const [taskState, setTaskState] = useState(false)
  const handleSetStatusTask = (ev: any) => {
    ev?.stopPropagation()
    ev?.preventDefault()
    console.log(!taskState, props)
    setTaskState(!taskState)
  }

  return (
    <Box
      borderWidth={1}
      p={4}
      rounded={5}
      cursor="pointer"
      _hover={{
        color: 'purple.500',
      }}
      color={!!taskState ? 'purple.500' : 'gray-700'}
      onClick={handleSetStatusTask}
    >
      <Checkbox colorScheme="purple" size="lg" value={props.value} isChecked={taskState}>
        <Text>{props.title}</Text>
      </Checkbox>
    </Box>
  )
}

export { Task }
