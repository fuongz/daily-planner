import { createTask } from '@/services/Task'
import { AddIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useRef } from 'react'

interface CreateTaskProps {}

export const CreateTask: React.FC<CreateTaskProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const toast = useToast()
  const { mutateAsync } = createTask()

  const validateTitle = (value: any) => {
    let error
    if (!value) {
      error = 'Name is required'
    }
    return error
  }

  const validateDescription = (value: any) => {
    let error
    if (!value) {
      error = 'Description is required'
    }
    return error
  }

  const handleSubmit = (values: any, actions: any) => {
    const { taskTitle, ...rest } = values
    mutateAsync({
      title: values.taskTitle,
      ...rest,
    }).then((response: any) => {
      if (response.status !== 201) {
        toast({ title: 'Error', position: 'top', description: response.message, status: 'error', duration: 5000, isClosable: true })
      } else {
        onClose()
      }
      actions.setSubmitting(false)
    })
  }

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="purple" onClick={onOpen}>
        New Task
      </Button>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              taskTitle: '',
              description: '',
            }}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <ModalHeader>Create New Task</ModalHeader>
                <ModalBody>
                  <Field name="taskTitle" validate={validateTitle}>
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.taskTitle && form.touched.taskTitle}>
                        <FormLabel>Name</FormLabel>
                        <Input ref={initialRef} {...field} autoComplete="off" placeholder="Task name" />
                        <FormErrorMessage>{form.errors.taskTitle}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description" validate={validateDescription}>
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.description && form.touched.description}>
                        <FormLabel>Description</FormLabel>
                        <Input {...field} placeholder="Task description" />
                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="purple" isLoading={props.isSubmitting} type="submit" mr={3}>
                    Create
                  </Button>

                  <Button colorScheme="ghost" variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
