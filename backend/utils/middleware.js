const unknownEndpoint = async (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    console.log('ERROR OCCURED:', error)
    next(error)
}

module.exports = { unknownEndpoint, errorHandler }