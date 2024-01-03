import {
  Button,
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
import { createTransaction } from '@/services'
import { getAllCategories } from '@/services/Category'
import { NumericFormat } from 'react-number-format'

interface CreateTransactionProps {}

const CreateTransaction: React.FC = ({}: CreateTransactionProps) => {
  const { onClose, onOpen, isOpen } = useDisclosure()
  const { data: categories } = getAllCategories()
  const toast = useToast()
  const { mutateAsync } = createTransaction()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const handleSubmit = (data: any, actions: any) => {
    console.log(data, actions)
  }

  return (
    <>
      <Button colorScheme="yellow" onClick={onOpen}>
        Create new transaction
      </Button>

      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              amount: null,
              note: '',
              timestamp: new Date(),
              category_id: null,
              wallet_id: null,
              status: false,
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <ModalHeader>Create new transaction</ModalHeader>
                <ModalBody>
                  <Field name="amount">
                    {({ field, form }: any) => (
                      <FormControl isInvalid={form.errors.amount && form.touched.amount}>
                        <FormLabel>Amount</FormLabel>
                        <NumericFormat
                          customInput={Input}
                          defaultValue={field.value}
                          {...field}
                          onValueChange={(values) => {
                            form.setFieldValue(field.name, values.floatValue)
                          }}
                          suffix={' đ'}
                          thousandSeparator=","
                          decimalSeparator="."
                          placeholder="0 đ"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                  <Button colorScheme="gray" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button isLoading={props.isSubmitting} type="submit" ml={3}>
                    Create new transaction
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

export { CreateTransaction }
