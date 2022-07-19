const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 7400

app.use(express.json())

//send all requests for auth to routes/auth.js file
app.use('/api/auth', require('./routes/auth'))
//send all requests for notes to routes/notes.js file
// app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})