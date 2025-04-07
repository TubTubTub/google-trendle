import { ActionIcon, Box, Tooltip } from '@mantine/core'

export const LinkIconButton = ({ label, link, icon, size="lg" }) => {
    return (
        <Tooltip label={label} openDelay={250} closeDelay={100}>
            <ActionIcon
            variant="outline"
            size={size}
            aria-label={label}
            onClick={() => window.open(link)}
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    )
}

export const ToolIconButton = ({ label, onClick, icon, size="lg", tooltip=true, disabled=false }) => {
    const button = (
        <ActionIcon
            varint="light"
            size={size}
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
        </ActionIcon>
    )

    return (
        <Box>
            {
                (!tooltip) ? button :
                <Tooltip label={label} openDelay={500} closeDelay={100}>
                    {button}
                </Tooltip>
            }
        </Box>
    )
}