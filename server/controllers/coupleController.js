import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'users.json')

async function createDescription(req, res) {
  try {

    const { coupleDescription, userId } = req.body
    let users = []

    const data = fs.readFileSync(dbPath, 'utf-8')
    users = data ? JSON.parse(data) : []

    const userExist = users.some(user => user.id === userId)

    if (!userExist) {
      res.status(401).json({
        message: 'usuario nao encontrado...'
      })
    }

    const user = users.find(user => user.id === userId)
    user.description = coupleDescription

    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2), 'utf-8')

    res.status(200).json({
      message: 'success',
      description: coupleDescription
    })

  } catch (error) {

    console.error(error)
    res.status(500).json({
      message: 'internal server error'
    })

  }
}

async function registerCouple(req, res) {

  try {

    let users = []
    const { userId, coupleId, name, age, birthday } = req.body

    const data = fs.readFileSync(dbPath, 'utf-8')
    users = data ? JSON.parse(data) : []

    const userExist = users.some(user => user.id === userId)

    if (!userExist) {
      res.status(401).json({
        message: 'usuario nao encontrado...'
      })
    }

    const user = users.find(user => user.id === userId)

    if (coupleId === 0) {
      user.couple.persons[0] = {
        id: 0,
        name,
        age,
        birthday,
      }
    } else if (coupleId === 1) {
      user.couple.persons[1] = {
        id: 1,
        name,
        age,
        birthday,
      }
    }

    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2))

    res.status(200).json({
      message: 'success',
      couple: user.couple
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'internal server error'
    })
  }
}

export default {
  createDescription,
  registerCouple
}