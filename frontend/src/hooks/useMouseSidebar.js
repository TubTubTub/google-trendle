import { useEffect } from 'react'
import { useDisclosure, useMouse } from '@mantine/hooks'

const useMouseSidebar = (width, verticalLimit, facing="left") => {
    const { mouseRef, x, y } = useMouse()
    const [opened, handlers] = useDisclosure(false)
    const margin = 5

    let horizontalLimit
    if (facing === 'left') {
        horizontalLimit = 0
    }
    else if (facing === 'right') {
        horizontalLimit = document.documentElement.clientWidth
    }
    else {
        throw new Error("Facing parameter must be 'right' or 'left'! (useMouseSidebar.jsx)")
    }

    useEffect(() => {
        if ((horizontalLimit - margin <= x) && (x <= horizontalLimit + margin) && (y >= verticalLimit) && (!opened)) {
            handlers.open()
        }
        else if ((Math.abs(x - horizontalLimit) >= width || y <= verticalLimit) && opened) {
            handlers.close()
        }
    }, [x, y, handlers, opened, horizontalLimit, verticalLimit, width])

    
    return [mouseRef, opened]
}

export default useMouseSidebar