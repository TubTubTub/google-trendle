import { useMantineTheme } from '@mantine/core'
import { LineChart, Line, YAxis, CartesianGrid } from 'recharts'
import { useTrendsValue } from '../../contexts/TrendsContextHooks'

const AnswerGraph = ({ width, height }) => {
    const theme = useMantineTheme()
    const trends = useTrendsValue()

    return (
            <LineChart data={trends.result.rawData} width={width} height={height} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} style={{ position: 'absolute', zIndex: -1 }}>
                <CartesianGrid
                    width={width}
                    height={height}
                    vertical={false}
                    stroke={theme.colors.gray[5]}
                    strokeWidth={1}
                    horizontalCoordinatesGenerator={(props) => [props.height / 3, props.height * 2/3]}
                />

                {trends.result.rawData.length === 0 ? null :
                <>
                <YAxis dataKey="value" axisLine={false} mirror={true} tickCount={3} tick={{ stroke: theme.colors.gray[5], strokeWidth: '0.5' }} />
                <Line type="monotone" dataKey="value" stroke="#9AA0A6" strokeWidth={2} animationDuration={750} dot={false} />
                </>
                }
            </LineChart>
    )
}

export default AnswerGraph