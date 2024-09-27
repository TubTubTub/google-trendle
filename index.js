const app = require('./app/app')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})