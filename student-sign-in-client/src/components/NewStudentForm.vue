<template>
    <div>
        <!-- Template/HTML Here-->

        <div class="alert alert-danger" v-if="errors.length > 0">
            <li v-for="error in errors" v-bind:key="error">
                {{ error }}
            </li>
        </div>

        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <!-- v-model newStudentName -->
                <input id="name" class="form-control" v-model.trim="newStudentName">
            </div>
            <div class="form-group">
                <label for="starID">Star ID</label>
                <!-- v-model newStarID -->
                <input id="starID" class="form-control" v-model.trim="newStarID">
            </div>
            <!-- v-on:click event handler -->
            <button class="btn btn-primary" v-on:click="addStudent">Add</button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'NewStudentForm',
    emits: ['student-added'], // document events this component emits
    data() {
        return {
            newStudentName: '', //v-model
            newStarID: '', //v-model
            errors: [] 
        }
    },
    methods: {
        addStudent() {

            this.errors = [] // clears errors array

            if (!this.newStudentName) {
                this.errors.push('Student name must be entered.')
            }

            if (!this.newStarID) {
                this.errors.push('StarID must be entered.')
            }

            if ((this.errors.length == 0)) {
                let student = {name: this.newStudentName, starID: this.newStarID, present: false}

                // emit message to parent with new student 
                this.$emit('student-added', student)

                this.newStudentName = '' 
                this.newStarID = '' 

            }

        }
    }//end of methods
}
</script>

<style scoped>

</style>

