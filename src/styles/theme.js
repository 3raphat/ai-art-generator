import { extendTheme } from '@chakra-ui/react'

const components = {
  Heading: {
    baseStyle: {
      fontFamily: '',
      fontWeight: '900',
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
  useSystemColorMode: false,
}

const theme = extendTheme({ config, components, styles })
export default theme
