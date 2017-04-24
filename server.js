const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()

// Static files
app.use(express.static('./build'))

// Serve index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log(`Listening on ${PORT}...`)
})
