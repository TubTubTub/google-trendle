const router = require('express').Router()

router.get('/', async (req, res) => {
    res.json({ test: 'test should be working hopefully...' })
})

module.exports = router