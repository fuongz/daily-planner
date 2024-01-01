import { extendTheme } from '@chakra-ui/react'
import { buttonTheme, inputTheme } from './themes/default'

const theme = extendTheme({
  fonts: {
    body: `'JetBrains Mono Variable', sans-serif`,
  },
  components: {
    Button: buttonTheme,
    Input: inputTheme,
  },
})

export default theme
