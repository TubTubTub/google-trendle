import { Button, Avatar, Menu } from '@mantine/core'
import { TbLogout2 } from 'react-icons/tb'
import { useProfileValue } from '../../contexts/ProfileContextHooks'

const UserAvatar = ({ onLogout, size="md" }) => {
    const { profile } = useProfileValue()

    return (
        <Menu>
            <Menu.Target>
                <Button variant="transparent" size={size} p={0}>
                    <Avatar size={size} src={profile.picture} name={profile.name} color="initials" alt={`${profile.name}'s user image`} />
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>{`Logged in as ${profile.name}`}</Menu.Label>
                <Menu.Item
                    color="red"
                    leftSection={<TbLogout2 />}
                    component="button"
                    onClick={onLogout}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default UserAvatar