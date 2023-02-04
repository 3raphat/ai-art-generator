import { extendTheme } from '@chakra-ui/react'

const components = {
  Heading: {
    baseStyle: {
      // fontFamily: '',
      fontWeight: '700',
    },
  },
}

const styles = {
  global: (props) => ({
    '&::-webkit-scrollbar': {
      w: '3',
      bg: 'blackAlpha.100',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 'full',
      bg: 'pink.400',
    },
    'html, body': {
      bg: 'white',
    },
  }),
}

const config = {
  initialColorMode: 'light',
}

const theme = extendTheme({ config, components, styles })
export default theme
