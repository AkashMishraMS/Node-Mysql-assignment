const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// import user routes
const userRoutes = require('./API/Routes/userRote')
const oragRoutes = require('./API/Routes/userRote')

// parser request data
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const port = process.env.Port || 5000

// app.get('/', (req, res) => {
//     res.status(200).json({
//         success:'1',
//         message:'Hello From Server'
//     })
// })

// create user route 

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/oragnization', oragRoutes)
app.listen(port, () => {
    console.log('Server is running at', port)
})