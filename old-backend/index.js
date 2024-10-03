const app = require('./app/app')
const { PORT } = require('./utils/config')
const trendsAPI = require('google-trends-api')

const wow = async () => {
    const hi = await trendsAPI.interestOverTime({ keyword: 'Garbanzo beans', startTime: new Date('2015-03-10'), endTime: new Date() })
    console.log(hi)
}
wow()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})