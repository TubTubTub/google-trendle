import { IoIosArrowBack } from 'react-icons/io'
import { ToolIconButton } from './Buttons'
import { useSetError } from '../contexts/ErrorContextHooks'

const PreviousTrendle = () => {
    const setError = useSetError()

    return (
        <ToolIconButton label="Previous trendle" onClick={() => console.log('back')} icon={<IoIosArrowBack />} tooltip />
    )
}

export default PreviousTrendle