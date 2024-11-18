import { Skeleton, Box } from '@mantine/core'


const LoadingList = () => {
    return (
        <Box>
            {Array(20).fill(0).map((_, index) => (
                <Skeleton key={index} w="93%" h='5vh' mx="sm" mt="md" animate={true} />
            ))}
        </Box>
    )
}

export default LoadingList