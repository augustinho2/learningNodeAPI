const router = require('express').Router()
const Person = require('../models/Person')



// ---- METODO CREATE ----

// rotas da API
router.post('/', async (req, res) => {
    // res.body: de onde vem os dados
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'o nome eh obrigatorio' })
    }

    const person = {
        name,
        salary,
        approved
    }

    // metodo create do mongoose
    try {
        // criando dados
        await Person.create(person)

        res.status(201).json({ message: 'pessoa inserida no sistema' })
        return
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// ---- METODO READ ----

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//rota dinamica: pra pegar registro unico

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição pela url = req.params:
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: "usuario nao encontrado" })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// ---- METODO UPDATE ----
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: "usuario nao encontrado" })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// ---- METODO DELETE ----
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: "usuario nao encontrado" })
        return
    }

    try {
        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'Usuario removido com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router