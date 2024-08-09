import api from './route.js'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3003

app.use(express.json())
app.use(cors())
app.use(api)

app.listen(port, () => {
    console.log(`Loves in the air on port:${port}`)
})