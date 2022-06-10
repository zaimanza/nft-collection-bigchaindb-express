var router = require('express').Router()
const useLocalStorage = require('../../../modules/useLocalStorage')
const usePlayer = require('../../../modules/usePlayer')

const { removeItem } = useLocalStorage()
const { player_login, player_register, getPlayer } = usePlayer()
// api/products
router.get('/', async (req, res) => {
    res.render('pages/AddMetadataPage/AddMetadataPage')
})

module.exports = router;


