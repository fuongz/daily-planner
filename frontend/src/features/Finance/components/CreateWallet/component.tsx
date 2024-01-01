import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Form, Field, Formik } from 'formik'
import { useRef } from 'react'
import { formSchema, transform } from './schema'
import { CurrencySelect } from '@/components/common'
import { createWallet } from '@/services/Wallet'

interface CreateWalletProps {}

const CreateWallet: React.FC = ({}: CreateWalletProps) => {
  const { onClose, onOpen, isOpen } = useDisclosure()
  const toast = useToast()
  const { mutateAsync } = createWallet()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const handleSubmit = (data: any, actions: any) => {
    mutateAsync(transform(data)).then((response: any) => {
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
      <Button colorScheme="yellow" onClick={onOpen}>
        Set up a wallet
      </Button>

      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              name: '',
              type: 'basic',
              currency: 'vnd',
              status: false,
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <ModalHeader>Create new wallet</ModalHeader>
                <ModalBody>
                  <Field name="name">
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Name</FormLabel>
                        <Input ref={initialRef} {...field} autoComplete="off" placeholder="Wallet name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="type">
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.type && form.touched.type}>
                        <FormLabel>Type</FormLabel>
                        <Select {...field} isReadOnly isDisabled placeholder="Select option">
                          <option value="basic">Basic</option>
                        </Select>
                        <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="currency">
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.currency && form.touched.currency}>
                        <FormLabel>Currency</FormLabel>
                        <CurrencySelect fieldName="currency" {...field} />
                        <FormErrorMessage>{form.errors.currency}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="status">
                    {({ field, form }: any) => (
                      <FormControl display="flex" alignItems="center" gap={4} mt={4} isInvalid={form.errors.status && form.touched.status}>
                        <Switch {...field} />
                        <FormLabel htmlFor="status" mb="0">
                          Exclude from Total
                        </FormLabel>
                        <FormErrorMessage>{form.errors.status}</FormErrorMessage>
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

export { CreateWallet }
