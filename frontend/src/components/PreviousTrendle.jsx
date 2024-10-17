import { IoIosArrowBack } from 'react-icons/io'
import { ToolIconButton } from './Buttons'

const PreviousTrendle = ({ setErrorMessage }) => {
    return (
        <ToolIconButton label="Previous trendle" onClick={() => console.log('back')} icon={<IoIosArrowBack />} tooltip />
    )
}

export default PreviousTrendle