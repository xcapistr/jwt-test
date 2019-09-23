require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
  {
    username: 'palino',
    title: 'post1'
  },
  {
    username: 'vaso',
    title: 'post2'
  }
]

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
  //authenticate user

  const username = req.body.username
  const user = { name: username }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})

//middleware
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //format: "Bearer <token>"
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)
