import { createTheme, virtualColor } from '@mantine/core'

const theme = createTheme({
    colors: {
        primary: virtualColor({
            name: 'primary',
            dark: 'red',
            light: 'blue',
        })
    },
    primaryShade: {
        light: 6,
        dark: 9,
    },
    primaryColor: 'primary',
    autoContrast: true
})

export default theme