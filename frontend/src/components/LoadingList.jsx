import { Skeleton, Stack } from '@mantine/core'


const LoadingList = () => {
    return (
        <Stack h="100%" py="md">
            {Array(15).fill(0).map((_, index) => (
                <Skeleton key={index} h="100%" width="90%" animate={true} style={{ alignSelf: 'center'}} />
            ))}
        </Stack>
    )
}

export default LoadingList