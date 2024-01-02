import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const outline = definePartsStyle({
  field: {
    _focusVisible: {
      borderColor: 'yellow.400',
      boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, var(--chakra-colors-yellow-100) 0px 0px 0px 4px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
    },
  },
})

export const inputTheme = defineMultiStyleConfig({
  variants: {
    outline,
  },
})
