const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'Name and number are required' 
        })
    }
    
    const nameExists = persons.some(p => p.name === body.name)
    if (nameExists) {
        return res.status(400).json({ 
            error: 'Name must be unique' 
        })
    }

    const newPerson = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)

    res.json(newPerson)
})

app.get('/info', (request, response) => {
  const count = persons.length
  const time = new Date()

  response.send(`
    <div>
      <p>Phonebook has info for ${count} people</p>
      <p>${time}</p>
    </div>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).send({ error: 'Person not found' })     
    }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})