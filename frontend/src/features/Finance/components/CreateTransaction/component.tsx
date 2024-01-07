import {
  Box,
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
  Switch,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Form, Field, Formik, FieldProps, FormikHelpers } from 'formik'
import { useRef } from 'react'
import { formSchema, transform } from './schema'
import { capitalizeFirstLetter, createTransaction, getAllWallets } from '@/services'
import { getAllCategories } from '@/services/Category'
import { NumericFormat } from 'react-number-format'
import { CommonSelect } from '@/components/common/CommonSelect/component'
import dayjs from 'dayjs'

interface CreateTransactionProps {}

const CreateTransaction: React.FC = ({}: CreateTransactionProps) => {
  const { onClose, onOpen, isOpen } = useDisclosure()
  const { data: categories } = getAllCategories()
  const { data: wallets } = getAllWallets()

  const toast = useToast()
  const { mutateAsync } = createTransaction()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const handleSubmit = (data: any, actions: FormikHelpers<any>) => {
    console.log(data, actions)
    actions.setSubmitting(true)
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
              timestamp: dayjs().format('YYYY-MM-DD'),
              category_id: null,
              wallet_id: wallets[0]._id,
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
                    {({ field, form }: FieldProps) => (
                      <FormControl isInvalid={!!form.errors.amount && !!form.touched.amount}>
                        <FormLabel>Amount</FormLabel>
                        <NumericFormat
                          customInput={Input}
                          defaultValue={field.value}
                          onValueChange={(values) => {
                            form.setFieldValue(field.name, values.floatValue)
                          }}
                          name={field.name}
                          suffix={' đ'}
                          thousandSeparator=","
                          decimalSeparator="."
                          placeholder="0 đ"
                        />
                        <FormErrorMessage>{capitalizeFirstLetter(form.errors.amount as string)}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="note">
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.note && form.touched.note}>
                        <FormLabel>Note</FormLabel>
                        <Textarea {...field} placeholder="Note" />
                        <FormErrorMessage>{capitalizeFirstLetter(form.errors.note)}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="category_id">
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.category_id && form.touched.category_id}>
                        <FormLabel>Category</FormLabel>
                        <CommonSelect
                          options={categories.map((category: any) => ({ value: category._id, label: `${category.type === 1 ? 'Income: ' : 'Outcome: '} ${category.name}` }))}
                          fieldName="category_id"
                          {...field}
                        />
                        <FormErrorMessage>{capitalizeFirstLetter(form.errors.category_id)}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="wallet_id">
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.wallet_id && form.touched.wallet_id}>
                        <FormLabel>Wallet</FormLabel>
                        <CommonSelect options={wallets.map((wallet: any) => ({ value: wallet._id, label: wallet.name }))} fieldName="wallet_id" {...field} />
                        <FormErrorMessage>{capitalizeFirstLetter(form.errors.category_id)}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="timestamp">
                    {({ field, form }: any) => (
                      <FormControl mt={4} isInvalid={form.errors.timestamp && form.touched.timestamp}>
                        <FormLabel>Date</FormLabel>
                        <Input {...field} placeholder="Select Date and Time" type="date" />
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
                        <FormErrorMessage>{capitalizeFirstLetter(form.errors.status)}</FormErrorMessage>
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
