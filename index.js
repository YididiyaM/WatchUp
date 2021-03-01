const express = require('express');
const app = express();

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())

app.set('view engine', 'html')

app.get('/posts', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/posts', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})

app.listen(3001, () => {
    console.log("On port 3001!")
})