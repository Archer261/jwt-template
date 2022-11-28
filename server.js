// THIS SERVER HANDLES DATABASE ROUTES FOR SENDING AND RECEIVING DATA UNRELATED TO TOKENS

const express = require('express');

// Initiate express server
const app = express();

const jwt = require('jsonwebtoken')
require('dotenv').config();

// Parse incoming JSON payloads
app.use(express.json())

// Test User Data
const posts = [
    {
        username: 'Joseph',
        title: 'Test1'
    },
    {
        username: 'Archer',
        title: 'Test2'
    }
]

// Retrieve test data for logged in user
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

// Matches incoming token with secret access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

app.listen(3000)