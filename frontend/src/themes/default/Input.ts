import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const outline = definePartsStyle({
  field: {
    _focusVisible: {
      borderColor: 'purple.500',
      boxShadow: '0 0 0 1px var(--chakra-colors-purple-500)',
    },
  },
})

export const inputTheme = defineMultiStyleConfig({
  variants: {
    outline,
  },
})
