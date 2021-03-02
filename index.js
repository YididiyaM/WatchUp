const express = require('express');
const { UpgradeRequired } = require('http-errors');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');


//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())

//Views folder and EJS setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//fake database 
let posts = [
    {
        id: uuid(),
        username: 'Karen',
        post: 'There is a homeless man on 52nd secret'
    },

    {
        id: uuid(),
        username: 'Kyle',
        post: 'Suspicious dude eating hot dogs sideways'
    }
]
// **********************************
//Render initial html page with form
// **********************************
app.get('', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//**********************************
// Shows a list from the array on a new page
// **********************************

app.get('/posts', (req,res)=>{
    res.render('posts/index', {posts})
})

// **********************************
// NEW - renders a form
// **********************************

app.get('/posts/new', (req,res) =>{
    res.render('posts/new')
})

app.post('/posts', (req,res) =>{
    const {username, post} = req.body; 
    posts.push({username, post})
    res.redirect('/posts');
})

app.get('/posts/:id', (req,res)=> {
    const { id } = req.params;
    posts.find(p => p.id === parseInt(id))
    res.render('posts/show', {posts})
})

app.listen(3001, () => {
    console.log("On port 3001!")
})