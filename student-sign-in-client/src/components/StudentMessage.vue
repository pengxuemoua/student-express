<template>

    <div v-if="student.name">
                <div v-if="student.present" class="alert alert-success" role="alert">
                    Welcome, {{ student.name }}
                </div>

                <div v-else class="alert alert-secondary" role="alert">
                    Goodbye, {{ student.name }}. See you later!
                </div>

    </div>

</template>

<script>
export default {
    //create component here
    name: 'StudentMessage',
    props: {
        student: Object
    }
}
</script>

<style scoped>

</style>

