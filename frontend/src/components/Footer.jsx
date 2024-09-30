import { Group } from '@mantine/core'
import { IoLogoGithub, IoLogoInstagram } from 'react-icons/io5'
import { LinkIconButton } from './Buttons'

const Footer = () => {
    return (
        <Group h="100%" justify="flex-end" gap="0.75em">
            <LinkIconButton label="Link to GitHub" link='https://github.com/TubTubTub' icon={<IoLogoGithub size="1.75em" />} />
            <LinkIconButton label="Link to Instagram" link='https://www.instagram.com/champagnepapi/' icon={<IoLogoInstagram size="1.75em" />} />
        </Group>
    )
}

export default Footer