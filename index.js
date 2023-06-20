// config inicial
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const Person = require('./models/Person')

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


// entregar uma porta
mongoose.connect('mongodb+srv://augustocapeto:AoOMeMksHGVTrfTm@apicluster.p7xta03.mongodb.net/bancodaapi?retryWrites=true&w=majority')
    .then(()=>{
        console.log("contectamos ao mongoDB")
        app.listen(3000)
    })
    .catch((err) => console.log(err))
