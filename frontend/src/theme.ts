import { extendTheme } from '@chakra-ui/react'
import { buttonTheme, inputTheme, switchTheme } from './themes/default'

const theme = extendTheme({
  fonts: {
    body: `'Cabin Variable', sans-serif`,
  },
  components: {
    Button: buttonTheme,
    Input: inputTheme,
    Switch: switchTheme,
  },
})

export default theme
