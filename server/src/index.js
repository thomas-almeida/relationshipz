import api from './route.js'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const port = 3003
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(cors())
app.use(api)

app.use('/photos', express.static(path.join(__dirname, '..', 'db', 'photos')))

app.listen(port, () => {
    console.log(`Loves in the air on port:${port}`)
})