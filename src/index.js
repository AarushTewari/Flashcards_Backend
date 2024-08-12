import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {authRouter} from './routes/authRoutes.js'
import { flashcardRouter } from './routes/flashcardRoutes.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", authRouter)
app.use("/flashcards/", flashcardRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})