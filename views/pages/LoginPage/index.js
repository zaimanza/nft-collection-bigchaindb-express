var router = require('express').Router()
const useLocalStorage = require('../../../modules/useLocalStorage')
const usePlayer = require('../../../modules/usePlayer')

const { removeItem } = useLocalStorage()
const { player_login, player_register, getPlayer } = usePlayer()
// api/products
router.get('/', async (req, res) => {
    removeItem({
        key: "player",
    })
    const handleClickLogin = async () => {
        console.log("hello_aiman")
        const register_result = await player_login({
            mnemonic: "moment conduct device congress awkward grain team gas flight option culture sign"
        })
        console.log("the_result")
        console.table(register_result)
    }
    res.render('pages/LoginPage/LoginPage', {
        handleClickLogin: handleClickLogin,
    })
})

module.exports = router;


