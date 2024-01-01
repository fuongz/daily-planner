import { Box, HStack, Img, Text, VStack } from '@chakra-ui/react'
import { useField } from 'formik'
import { FC } from 'react'
import Select, { components } from 'react-select'

const options = [
  { value: 'vnd', label: 'Vietnam Dong (đ)', icon: '/assets/icons/flags/vn.svg' },
  { value: 'usd', label: 'United States Dollar ($)', icon: '/assets/icons/flags/us.svg' },
]

const { Option } = components
const IconOption = (props: any) => (
  <Option {...props}>
    <HStack alignItems="center">
      <Img src={props.data.icon} w={4} alt={props.data.label} />
      <Text>{props.data.label}</Text>
    </HStack>
  </Option>
)

interface CurrencySelectProps {
  placeholder: string
  fieldName: string
}

const CurrencySelect: FC<CurrencySelectProps> = ({ fieldName, placeholder, ...props }) => {
  const [field, _meta, { setValue }] = useField(fieldName)
  const onChange = (selectedOptions: any) => {
    setValue(selectedOptions?.value || null)
  }
  return (
    <Select
      defaultValue={options.find((option) => option.value === field.value)}
      options={options}
      components={{ Option: IconOption }}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={field.onBlur}
    />
  )
}

export { CurrencySelect }
