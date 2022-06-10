var router = require('express').Router()
const useCollection = require('../../../modules/useCollection')
const usePlayer = require('../../../modules/usePlayer')

const { player_login, player_register, getPlayer } = usePlayer()
const { getCollection } = useCollection()
// api/products
router.get('/', async (req, res) => {
    const register_result = await player_login({
        mnemonic: "moment conduct device congress awkward grain team gas flight option culture sign"
    })
    console.log("the_result")
    console.table(register_result)
    const fetchedCollection = await getCollection()
    // chcek in db if collection tkda

    if (fetchedCollection) {
        res.render('pages/HomePage/HomePage')
    } else {
        res.render('pages/SetupCollectionPage/SetupCollectionPage')
    }
})

module.exports = router;
