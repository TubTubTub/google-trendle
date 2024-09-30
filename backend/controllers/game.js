const router = require('express').Router()

router.get('/', async (req, res) => {
    res.json({ hi: 'hi there' })
})

module.exports = router