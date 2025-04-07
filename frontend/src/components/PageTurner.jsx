import { Group, Text } from '@mantine/core'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

import { ToolIconButton } from './Buttons'

const PageTurner = ({ pageNumber, setPageNumber, maxPage }) => {
    return (
        <Group h="3rem" justify="center" gap="2rem">
            <ToolIconButton label="Previous Page" onClick={() => setPageNumber(pageNumber - 1)} icon={<GrFormPrevious />} tooltip={false} disabled={pageNumber === 1} />
            <Text ta="center" fw={500}>Page {pageNumber} / {maxPage}</Text>
            <ToolIconButton label="Next Page" onClick={() => setPageNumber(pageNumber + 1)} icon={<GrFormNext />} tooltip={false} disabled={pageNumber === maxPage} />
        </Group>
    )
}

export default PageTurner