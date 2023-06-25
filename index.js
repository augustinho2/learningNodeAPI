// config inicial
const express = require('express')
const app = express()
require('dotenv').config()

const mongoose = require('mongoose')

const DB_USER  = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// forma de ler json /middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rota inicial
app.get('/', (req, res) => {
    //mostrar requisição

    //tornar rota funcional
    res.json({ message: 'save' })
})


// :::::::::: rotas da API


const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// entregar uma porta
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.p7xta03.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
    .then(() => {
        console.log("contectamos ao mongoDB")
        app.listen(3000)
    })
    .catch((err) => console.log(err))
