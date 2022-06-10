const bip39 = require('bip39')
const BigChainDB = require('bigchaindb-driver')
const useLocalStorage = require('./useLocalStorage')

const useCollection = () => {

    const { setItem, getItem } = useLocalStorage()

    const getCollection = async () => {
        const localPlayetrData = await JSON.parse(
            await getItem({
                key: "player"
            })
        )
        console.log(localPlayetrData)
        return true
    }

    return { getCollection }
}

module.exports = useCollection