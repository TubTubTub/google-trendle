import { createTheme, rem, virtualColor } from '@mantine/core'

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
        canvasButtonHeight: rem('2rem')
    }
})

export default theme