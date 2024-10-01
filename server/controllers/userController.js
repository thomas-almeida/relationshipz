import generateId from '../utils/generateIds.js'
import cript from '../utils/decodes.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import * as cheerio from 'cheerio'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', 'db', 'users.json')


async function scrapeInstagramProfilePicture(instagramUrl) {
  try {

    const response = await axios.get(instagramUrl)
    const html = response.data
    const $ = cheerio.load(html)

    const profilePicUrl = $('meta[property="og:image"]').attr('content');

    if (profilePicUrl) {
      const imagePath = path.basename(profilePicUrl)
      return imagePath
    }

    return null

  } catch (error) {
    console.error('Error scraping Instagram:', error)
    return null
  }
}

async function signUp(req, res) {

  let users = []

  try {

    const { coupleName, email, description, password, beginAt } = req.body

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, '[]')
    }

    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8')
      users = data ? JSON.parse(data) : []
    }

    const userExist = users.some(user => user.email === email)

    if (userExist) {
      return res.status(409).json({ message: 'Já existe um casal com esse email!' })
    }

    let encriptedPassword = cript.encrypt(password)

    const id = generateId.generateExtenseId(users)

    const coupleObj = {
      name: coupleName,
      persons: [
        {
          id: 0,
          profilePic: '',
          mood: ''
        },
        {
          id: 1,
          profilePic: '',
          mood: ''
        },
      ]
    }

    const newUser = {
      id,
      email,
      couple: coupleObj,
      beginAt,
      password: encriptedPassword,
      photos: [],
      goals: [],
      subscription: 'YEARLY_DEFAULT',
      description,
      favoriteSong: ''
    }

    users.push(newUser)
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2))
    console.log(`Couple [${id}]${coupleObj.name} has been registered`)
    return res.status(201).json(newUser)

  } catch (error) {

    console.error(error)
    return res.status(500).json({ message: 'internal server error' })

  }

}

async function signIn(req, res) {
  let users = []

  try {
    const { email, password } = req.body

    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8')
      users = data ? JSON.parse(data) : []
    }

    let encriptedPassword = cript.encrypt(password)

    const userRegistered = users.find(user => user.email === email && user.password === encriptedPassword)

    if (userRegistered) {
      console.log(`user [${userRegistered.id}]${userRegistered.email} has logged in`)
      return res.status(200).json({
        message: 'success',
        user: userRegistered
      })
    } else {
      return res.status(401).json({ message: 'Email or password do not match' })
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

async function saveSettings(req, res) {

  let users = []

    const data = fs.readFileSync(dbPath, 'utf-8')
    users = data ? JSON.parse(data) : []

    try {
      const {userId, newMessage, newDescription, newBeginAt} = req.body
      const userExist = users.some(user => user.id === userId)

      if (!userExist) {
        res.status(401).json({ message: 'user not found' })
      }
  
      const user = users.find(user => user.id === userId)
      user.description = newMessage
      user.message = newDescription
      user.beginAt = newBeginAt

      fs.writeFileSync(dbPath, JSON.stringify(users, null, 2))
      console.log(`Couple [${userId}] Change message to ${newMessage} & begin date to ${newBeginAt}`)
      return res.status(201).json({
        message: 'success',
        newMessage: newMessage,
        newDescription: newDescription,
        newBeginAt: newBeginAt
      })

    } catch (error) {
      res.status(500).json({
        message: 'internal server error'
      })
      console.error(error)
    }
}

export default {
  signIn,
  signUp,
  getUserById,
  saveSettings
}