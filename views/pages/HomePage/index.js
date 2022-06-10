var router = require('express').Router()
const useBigchaindb = require('../../../modules/useBigchaindb')
const useCollection = require('../../../modules/useCollection')
const useMetadata = require('../../../modules/useMetadata')
const usePlayer = require('../../../modules/usePlayer')

const { player_login, player_register, getPlayer } = usePlayer()
const { getCollection, createCollection } = useCollection()
const { getMetadata, createMetadata } = useMetadata()
const { fetchLatestTransaction } = useBigchaindb()
// api/products
router.get('/', async (req, res) => {
    const createCollectionData = req.query
    if (
        createCollectionData.title != '' &&
        createCollectionData.description != '' &&
        createCollectionData.image != ''
    ) {
        const player = await getPlayer()
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
    if (
        createCollectionData.trait_type != '' &&
        createCollectionData.value != '' &&
        createCollectionData.display_type != ''
    ) {
        const player = await getPlayer()

        await createMetadata({
            asset: {
                type: "metadata",
            },
            metadata: {
                trait_type: createCollectionData.trait_type,
                value: createCollectionData.value,
                display_type: createCollectionData.display_type,
            },
            publicKey: player.publicKey,
            privateKey: player.privateKey
        })
    }

    const register_result = await player_login({
        mnemonic: "moment conduct device congress awkward grain team gas flight option culture sign"
    })
    // console.table(register_result)
    const fetchedCollection = await getCollection()
    // chcek in db if collection tkda
    if (fetchedCollection) {
        const latestFetchTransaction = await fetchLatestTransaction(fetchedCollection.id)

        await res.render('pages/HomePage/HomePage', latestFetchTransaction.metadata)
    } else {
        await res.render('pages/SetupCollectionPage/SetupCollectionPage')
    }
})

module.exports = router;
