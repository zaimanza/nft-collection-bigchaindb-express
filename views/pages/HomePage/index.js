var router = require('express').Router()
const useBigchaindb = require('../../../modules/useBigchaindb')
const useCollection = require('../../../modules/useCollection')
const useMetadata = require('../../../modules/useMetadata')
const usePlayer = require('../../../modules/usePlayer')

const { player_login, player_register, getPlayer } = usePlayer()
const { getCollection, createCollection } = useCollection()
const { getMetadatas, createMetadata } = useMetadata()
const { fetchLatestTransaction } = useBigchaindb()
// api/products
router.get('/:mode', async (req, res) => {
    const mode = req.params?.mode ?? null
    const createCollectionData = req.query
    if (mode == "setup_collection") {
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
    }
    if (mode == "add_metadata") {
        if (
            createCollectionData.name != '' &&
            createCollectionData.description != '' &&
            createCollectionData.token_id != '' &&
            createCollectionData.image != '' &&
            createCollectionData.current_chain != ''
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
    }

    const register_result = await player_login({
        mnemonic: "salad shield toss purse scale weasel dilemma hill gold attitude name admit"
    })
    // console.table(register_result)
    const fetchedCollection = await getCollection()
    const fetchedMetadatas = await getMetadatas()
    // chcek in db if collection tkda
    if (fetchedCollection) {
        const latestFetchTransaction = await fetchLatestTransaction(fetchedCollection.id)
        var latestFetchMetadatas = []
        console.log("checking_collection_metadatas")
        console.log(fetchedMetadatas)
        if (fetchedMetadatas.length != 0) {
            for (const fetchedMetadata of fetchedMetadatas) {
                const latestFetchMeta = await fetchLatestTransaction(fetchedMetadata.id)
                latestFetchMetadatas.push(latestFetchMeta.metadata)
            }
            console.log(latestFetchMetadatas)
        }
        await res.render('pages/HomePage/HomePage',
            {
                collectionData: latestFetchTransaction.metadata,
                metadatas: latestFetchMetadatas,
            }
        )
    } else {
        await res.render('pages/SetupCollectionPage/SetupCollectionPage')
    }
})

module.exports = router;
