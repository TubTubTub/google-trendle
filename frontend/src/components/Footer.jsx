import { Group } from '@mantine/core'
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io5'
import { LinkIconButton } from './Buttons'

const Footer = () => {
    return (
        <Group h="100%" justify="flex-end" gap="0.75rem" px="0.75rem">
            <LinkIconButton label="Link to GitHub" link='https://github.com/TubTubTub' size="2.5rem" icon={<IoLogoGithub size="2rem" />} />
            <LinkIconButton label="Link to Instagram" link='https://www.instagram.com/champagnepapi/' size="2.5rem" icon={<IoLogoInstagram size="2rem" />} />
        </Group>
    )
}

export default Footer