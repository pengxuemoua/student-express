import axios from 'axios'

let base_url = '/api/students'

export default {

    getAllStudents() { // get all student function 
        return axios.get(base_url).then(response => {
            return response.data
        })
    },
    addStudent(student) { // add student function 
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    },

    updateStudent(student) { //update student function
        // create URL in the form /api/students/1
        return axios.patch(`${base_url}/${student.id}`, student).then( response => {
            return response.data 
        })
    },

    deleteStudent(id) { // delete function, will use id to delete data
        // create URL in the form /api/students/1
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }

}

