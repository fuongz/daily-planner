import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const solid = defineStyle({
  borderRadius: 20,
})

export const buttonTheme = defineStyleConfig({
  variants: { solid },
})
