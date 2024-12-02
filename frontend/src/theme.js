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
    autoContrast: true,
    other: {
        canvasButtonHeight: '3rem'
    }
})

export default theme