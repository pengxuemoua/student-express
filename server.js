// this will be the server's code
//package.json will decribes our app, its name and libraries 

let express = require('express') // create new express app
let api_routes = require('./routes/api') // require routes/api file
let path = require('path')

let app = express() // create a new web app

let vueClientpath = path.join(__dirname, 'student-sign-in-client', 'dist')
app.use(express.static(vueClientpath))

// handle json body request
// handles json requests and converts data to JavaScript
app.use(express.json()) // parse and understand json

app.use('/api', api_routes)

app.use(function(req, res, next){
    // respond with a 404 to any other requests
    res.status(404).send('Not found')
})

app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send('Server error')
})


// create server to run app
let server = app.listen(process.env.PORT || 3000, function(){ // runs on port 3000
    
    // confirmation message, shows our server is running
    console.log('Express server running on port', server.address().port)
}) 



