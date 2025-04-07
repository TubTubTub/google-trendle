import { Group } from '@mantine/core'
import { IoLogoGithub } from 'react-icons/io5'
import { FaGoogle } from 'react-icons/fa'
import { TiHome } from "react-icons/ti"

import { LinkIconButton } from './Buttons'

const Footer = () => {
    return (
        <Group h="100%" justify="flex-end" gap="0.75rem" px="0.75rem">
            <LinkIconButton label="Link to GitHub Repository" link='https://github.com/TubTubTub/google-trendle' size="2.5rem" icon={<IoLogoGithub size="2rem" />} />
            <LinkIconButton label="Link to Google Trends" link='https://trends.google.com' size="2.5rem" icon={<FaGoogle size="1.5rem" />} />
            <LinkIconButton label="Link to Main Page" link='https://tubtubtub.com' size="2.5rem" icon={<TiHome size="2rem" />} />
        </Group>
    )
}

export default Footer