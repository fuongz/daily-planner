import { Box, HStack, Text } from '@chakra-ui/react'
import { useField } from 'formik'
import { FC } from 'react'
import Select, { components } from 'react-select'

const { Option } = components
const IconOption = (props: any) => (
  <Option {...props}>
    <HStack alignItems="center">
      <Text>{props.data.label}</Text>
    </HStack>
  </Option>
)

interface CommonSelectProps {
  placeholder: string
  fieldName: string
  options: Array<{ value: string; label: string }>
}

const CommonSelect: FC<CommonSelectProps> = ({ fieldName, placeholder, ...props }) => {
  const [field, _meta, { setValue }] = useField(fieldName)
  const onChange = (selectedOptions: any) => {
    setValue(selectedOptions?.value || null)
  }
  return (
    <Box w="full">
      <Select
        defaultValue={props.options.find((option) => option.value === field.value)}
        options={props.options}
        components={{ Option: IconOption }}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={field.onBlur}
      />
    </Box>
  )
}

export { CommonSelect }
