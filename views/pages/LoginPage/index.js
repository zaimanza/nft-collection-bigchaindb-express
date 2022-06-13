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
        const mnemonic = "salad shield toss purse scale weasel dilemma hill gold attitude name admit"
        const register_result = await player_login({
            mnemonic: "salad shield toss purse scale weasel dilemma hill gold attitude name admit"
        })
        // console.table(register_result)
    }
    res.render('pages/LoginPage/LoginPage', {
        handleClickLogin: handleClickLogin,
        mnemonic: "salad shield toss purse scale weasel dilemma hill gold attitude name admit",
    })
})

module.exports = router;


