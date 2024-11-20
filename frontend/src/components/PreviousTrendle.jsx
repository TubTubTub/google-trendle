import { IoIosArrowBack } from 'react-icons/io'
import { ToolIconButton } from './Buttons'
import { useSetError } from '../contexts/ErrorContextHooks'
import usePreviousTrendle from '../hooks/usePreviousTrendle'

const PreviousTrendle = () => {
    const setError = useSetError()
    const [previousDisabled, loadPreviousTrendle] = usePreviousTrendle()

    return (
        <ToolIconButton label="Previous trendle" onClick={loadPreviousTrendle} icon={<IoIosArrowBack />} disabled={previousDisabled} tooltip />
    )
}

export default PreviousTrendle