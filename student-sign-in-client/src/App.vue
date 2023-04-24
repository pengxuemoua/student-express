<template>
  <div id="app">

  <!-- add all components: NewStudentForm, StudentTable and StudentMessage -->
  <new-student-form v-on:student-added="newStudentsAdded"></new-student-form>
  <student-table v-bind:students="students" 
  v-on:student-arrived-or-left="studentArrivedOrLeft" 
  v-on:delete-student="studentDeleted"></student-table>
  
  <student-message v-bind:student="mostRecentStudent"></student-message>

  </div>

</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'; //import components
import StudentMessage from './components/StudentMessage.vue'; //import components
import StudentTable from './components/StudentTable.vue'; //import components

export default {
  name: 'app',
  components: { 
    NewStudentForm, // add components
    StudentMessage,
    StudentTable
  },
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  mounted() {
    // load all students - make request to API
    this.updateStudents()
  },
  methods: {
    updateStudents() { // method will update data, new student, welcome/goodbye message, and when student is deleted
      this.$student_api.getAllStudents().then( students => {
        this.students = students 
      }).catch( () => alert('Unable to fetch student list')) // generic error handler
    },
    newStudentsAdded(student) { 
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents() // after a new student is added, call updateStudents()
      })
      .catch( err => {
        let msg = err.response.data.join(',')
        alert('Error adding student\n' + msg) // show error message to user when they add a student with a duplicate starID
      } )
    },
    studentArrivedOrLeft(student, present) {
      student.present = present // update present value 
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents() // each time a student leaves or arrives, call updateStudents()
      }).catch( () => alert('Unable to update student')) // generic error handler
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () =>{
        this.updateStudents() // after deleting data, call updateStudents()
        this.mostRecentStudent = {} // set to empty object, this will clear welcome/goodbye message
      }).catch( () => alert('Unable to delete student')) // generic error handler
    }

  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

</style>
