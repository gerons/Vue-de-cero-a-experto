<template>
    <div>
        <img src="https://via.placeholder.com/250" alt="bg">
        <div class="bg-dark"></div>

        <div class="indecision-container">
            <input type="text" placeholder="hazme una pregunta">
            <p>Recuerda terminar con un signo de interrogación (?)</p>

            <div>
                <h2>¿Seré millonario?</h2>
                <h1>si, no, pensando...</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Indecision',
    props: {
    },
    data() {
        return {
            variable: ''
        }
    }
}
</script>

<style scoped>

</style>