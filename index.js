const express = require('express');

const dataModel = require('./data/db.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello')
})

server.get('/users', (req, res) => {
    dataModel
    .find()
    .then(data => {
        res.send(data)
    }).catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    });
})

server.get('/users/:id', (req, res) => {

    const id = req.params.id;

    dataModel
        .findById(id)
        .then(data => {
            !data ? res.status(404).json({ message: "The user with the specified ID does not exist." })
            : res.send(data)
        }).catch(error => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        });
})

server.post('/users', (req, res) => {

    const Data = req.body;

    // console.log('data', Data)
    // console.log('T/F', (!Data.name || !Data.bio))


    (!Data.name || !Data.bio) ? res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    : dataModel
        .insert(Data)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        });
});

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    dataModel
        .remove(id)
        .then(data => {
            !data ? res.status(404).json({ message: "The user with the specified ID does not exist." })
            :res.json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed"})
        })
})

server.put('/users/:id', (req, res) => {

    const id = req.params.id;

    dataModel
        .remove(id)
        .then(data => {
            !data ? res.status(404).json({ message: "The user with the specified ID does not exist." })
            : (!data.name || !data.bio) ? res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            :res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be modified"})
        })
})

const port = 8000;

server.listen(port, () => console.log(`\n** API on port ${port} **\n`));
