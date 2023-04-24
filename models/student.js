// this will describe our student objects

// module.exports means, when something else uses this file, module.exports is a function/data that will be provided
module.exports = (sequelize, DataTypes) => { 
    // creating Student object 
    let Student = sequelize.define('Student', {
        // define the fields of Student object 

        name: { // first field is name
            // properties
            type: DataTypes.STRING, // string value
            allowNull: false // does not allow null value

        },
        starID: { // second field is starID of the student 
            type: DataTypes.STRING, // string value
            allowNull: false,
            unique: true
        },
        present: { // third field is present, shows if student is present or not
            type: DataTypes.BOOLEAN, // boolean value
            allowNull: false,
            defaultValue: false

        }
    })

    // this code will create the tables in the database 
    // force: true means it will overwrite any old database tables, so if we change the structure of our database, the database will be updated
    // force specifies whether to drop the table or not
    // true = drop table every time app restarts. Need this setting if table schema changed.
    // false = keep table
    Student.sync( {force: false} ).then( () => { // returns a promise
        // log message
        console.log('Synced Student table ')
    })

    return Student // return the Student model

}

