import { ChakraProvider, ComponentStyleConfig, ThemeConfig, extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const Button: ComponentStyleConfig = {
    variants: {
        'primary': {
            bg: '#2797C1',
            borderRadius: "8px",
            color: "#F2F4F8",
            fontWeight: 'bold',
            padding: "25px 30px",
            border: "1px solid #fedf56",
            fontSize: "15px",
        },
        'outline': {
            borderRadius: "5px",
            color: "#F2F4F8",
            fontWeight: 'bold',
            padding: "12px 36px",
            border: "1px solid rgba(192,192,192,0.3) !important",
        },
    }
}

const components = {
    Button,
}

const theme = extendTheme({
    config,
    components
})

export default theme