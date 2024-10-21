import { Paper, Tooltip, useMantineTheme, useMantineColorScheme } from '@mantine/core'

const CustomPaper = (props) => {
    const theme = useMantineTheme()
    const { colorScheme, _ } = useMantineColorScheme()

    const paper = (
        <Paper
            style={{
                alignContent: 'center',
                backgroundColor: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
                ...props.style
            }}
            p={props.p ? props.p : "md"}
            shadow="none"
        >
            {props.children}
        </Paper>
    ) 
    
    if (props.tooltip) {
        return (
            <Tooltip label={props.label} openDelay={250} closeDelay={100}>
                {paper}
            </Tooltip>
        )
    }
    
    return paper
}

export default CustomPaper