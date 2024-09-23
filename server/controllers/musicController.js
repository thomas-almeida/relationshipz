import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import ytdl from '@distube/ytdl-core'
import yt from 'yt-search'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function serchSong(req, res) {

    try {

        const theme = req.params.theme.replace(/-/g, ' ')
        const userId = req.params.userId
        const foundedResults = await yt(theme)

        const dbPath = path.join(__dirname, '..', 'db', 'users.json')
        const usersData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
        const user = usersData.find(user => user.id === userId)

        if (!user) {
            return res.status(404).send('Usuário não encontrado')
        }

        let hqMusicResults = []

        foundedResults.all.forEach(result => {
            if (result.type === 'video') {
                hqMusicResults.push(result)
            }
        })

        user.favoriteSong = hqMusicResults[0]
        fs.writeFileSync(dbPath, JSON.stringify(usersData, null, 2), 'utf-8')

        res.status(200).json({
            message: 'success',
            song: hqMusicResults[0]
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'internal server error'
        })
    }

}

async function getStreamUrl(req, res) {
    try {

        const { videoId } = req.body
        const videoInfo = await ytdl.getInfo(videoId)
        const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly')

        if (audioFormats.length > 0) {
            const audioUrl = audioFormats[0].url
            res.status(200).json({ audioUrl })
        } else {
            res.status(404).json({ error: "nenhum formato de audio encontrado" })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'internal server error' })
    }
}


export default {
    serchSong,
    getStreamUrl
}