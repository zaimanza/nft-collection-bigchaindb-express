var router = require('express').Router()
const useCollection = require('../../../modules/useCollection')
const usePlayer = require('../../../modules/usePlayer')

const { player_login, player_register, getPlayer } = usePlayer()
const { getCollection, createCollection } = useCollection()
// api/products
router.get('/', async (req, res) => {
    const createCollectionData = req.query
    console.log("the_return_data")
    console.log(createCollectionData)
    if (createCollectionData.title != '' &&
        createCollectionData.title != '') {
        const player = await getPlayer()
        console.log("tengah_create")
        await createCollection({
            asset: {
                type: "collection",
            },
            metadata: {
                title: createCollectionData.title,
                description: createCollectionData.description,
                image: createCollectionData.image,
            },
            publicKey: player.publicKey,
            privateKey: player.privateKey
        })
    }
    const register_result = await player_login({
        mnemonic: "moment conduct device congress awkward grain team gas flight option culture sign"
    })
    console.log("the_result")
    console.table(register_result)
    const fetchedCollection = await getCollection()
    // chcek in db if collection tkda

    if (fetchedCollection) {
        await res.render('pages/HomePage/HomePage')
    } else {
        await res.render('pages/SetupCollectionPage/SetupCollectionPage')
    }
})

module.exports = router;
