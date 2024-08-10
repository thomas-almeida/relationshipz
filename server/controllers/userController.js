import generateId from '../utils/generateIds.js'
import cript from '../utils/decodes.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'users.json')

async function signUp(req, res) {

  let users = []

  try {

    const { firstPersonName, secondPersonName, email, username, password, beginAt } = req.body

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, '[]')
    }

    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8')
      users = data ? JSON.parse(data) : []
    }

    const userExist = users.some(user => user.username === username || user.email === email)

    if (userExist) {
      return res.status(409).json({ message: 'nome de usuario ou email ja existem!' })
    }

    let encriptedPassword = cript.encrypt(password)

    const id = generateId.generateExtenseId(users)
    const coupleObj = {
      name: "",
      persons: [
        {
          id: 0,
          name: firstPersonName,
          age: "",
          birthday: "",
          moodId: ""
        },
        {
          id: 1,
          name: secondPersonName,
          age: "",
          birthday: "",
          moodId: ""
        },
      ]
    }

    const newUser = {
      id,
      username,
      email,
      couple: coupleObj,
      beginAt,
      password: encriptedPassword,
      photos: [],
      goals: [],
      plan: 'free',
      description: '',
      favoriteSong: ''
    }

    users.push(newUser)
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2))
    console.log(`user [${id}]${username} has been registered`)
    return res.status(201).json(newUser)

  } catch (error) {

    console.error(error)
    return res.status(500).json({ message: 'internal server error' })

  }

}

async function signIn(req, res) {
  let users = []

  try {
    const { username, password } = req.body

    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8')
      users = data ? JSON.parse(data) : []
    }

    let encriptedPassword = cript.encrypt(password)

    const userRegistered = users.find(user => user.username === username && user.password === encriptedPassword)

    if (userRegistered) {
      console.log(`user [${userRegistered.id}]${userRegistered.username} has logged in`)
      return res.status(200).json({
        message: 'success',
        user: userRegistered
      })
    } else {
      return res.status(401).json({ message: 'username or password do not match' })
    }

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'internal server error' })
  }
}

async function getUserById(req, res) {

  try {
    const id = req.params.id
    let users = []

    const data = fs.readFileSync(dbPath, 'utf-8')
    users = data ? JSON.parse(data) : []

    const userExist = users.some(user => user.id === id)

    if (!userExist) {
      res.status(401).json({ message: 'user not found' })
    }

    const user = users.find(user => user.id === id)
    return res.status(200).json({
      message: 'success',
      user: user
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'internal server error' })
  }
}


export default {
  signIn,
  signUp,
  getUserById
}