import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const solid = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    borderWidth: c == 'gray' ? '1px' : undefined,
    borderStyle: c == 'gray' ? 'solid' : undefined,
    borderColor: c == 'gray' ? `${c}.200` : undefined,
    _active: {
      transform: 'scale(0.95, 0.95)',
    },
  }
})

export const buttonTheme = defineStyleConfig({
  variants: { solid },
  defaultProps: {
    colorScheme: 'yellow',
  },
})
