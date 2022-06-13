var router = require('express').Router()
const useLocalStorage = require('../modules/useLocalStorage')
const usePlayer = require('../modules/usePlayer')

const { removeItem } = useLocalStorage()
const { player_login, player_register, getPlayer } = usePlayer()
// api/products
router.get('/:assetId', async (req, res) => {
    try {
        console.log(req.params.assetId)
        res.status(200).json("hello")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;


