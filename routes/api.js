// create route for getting all the students
// create another route for adding a new student

let express = require('express') // express library

let db = require('../models') // models dir, uses index.js
let Student = db.Student

let router = express.Router()

// route find all students in the students table
router.get('/students', function(req, res, next){
    Student.findAll( {order: ['present','starID']} ).then( students => { //user "order: present, starID" to sort by present and then by starID
        return res.json(students) // converts data into json and returns it back to vue client 
    }).catch( err => next(err) ) // server error will be passed to server.js 
})

// post route, post is used to create or imply a create request. 
router.post('/students', function(req, res, next){
    Student.create( req.body ).then( data => { // creates new student object 
        return res.status(201).send('ok') // sends reponse back to client
    }).catch( err => { // catch err/handling 
        // handle user errors; missing starID or name
        if ( err instanceof db.Sequelize.ValidationError ) {
            //respond with a 400 bad request error code, include error messages
            let messages = err.errors.map( e => e.message )
            return res.status(400).json(messages) // return error in json form
        }

        // otherwise , something unexpected has gone wrong 
        return next(err) // user "next" to send error to server.js to handle server error

    } )
})

// edit students, patch is to update
router.patch('/students/:id', function(req, res, next){
    // if request is to /students/100, then studentID will be 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID } } ) //update based on id
        .then( (rowsModified) => {

            let numberOfRowsModified = rowsModified[0] // number of rows changed

            if (numberOfRowsModified == 1) { // exactly one row changed
                return res.send('ok') // return ok message
            } 

            else { // no rows or student not found found - return 404 error 
                return res.status(404).json(['Student with that id not found'])
            }
        }) 
        .catch( err => {
            // if validation error , tell user: that's a bad request
            // modification that violates contraint; modifying student to have no name
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map( e => e.message)
                return res.status(400).json(messages)
            } else {
                // unexpected error
                return next(err) // send error to server.js
            }
        })
})

// delete students, router.delete() will delete data
router.delete('/students/:id', function(req, res, next){
    let studentID = req.params.id
    // use destroy() to delete a row of data
    Student.destroy( {where: { id: studentID } } ) // delete based on id
        .then( (rowsDeleted) => {
            if (rowsDeleted == 1) {
                return res.send('ok') // return ok message to verify delete was successful
            } else {
                return res.status(404).json(['Not found']) // otherwise return not found
            }
        })
        .catch( err => next(err) ) // catch unexpected errors
})

module.exports = router
// don't write code below module.exports - it will be ignored
