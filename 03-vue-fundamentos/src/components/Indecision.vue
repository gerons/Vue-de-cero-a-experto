<template>
    <div>
        <img v-if="img" :src="img" alt="bg">
        <div class="bg-dark"></div>

        <div class="indecision-container">
            <input v-model="question" type="text" placeholder="hazme una pregunta">
            <p>Recuerda terminar con un signo de interrogación (?)</p>

            <div v-if="isValidQuestion">
                <h2>{{ question }}</h2>
                <h1>{{ laRespuesta }}</h1>
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
            question: null,
            answer: null,
            img: null,
            isValidQuestion: false
        }
    },
    watch: {
        question(value) {
            this.isValidQuestion = false
            if (!value.includes('?')) return 
            
            this.getAnswer()
        }
    },
    methods: {
        async getAnswer() {
            this.isValidQuestion = true
            this.answer = 'Pensando...'

            const { answer, image } = await fetch('https://yesno.wtf/api')
                .then(response => response.json())

            this.answer = answer
            this.img = image
        }
    },
    computed: {
        laRespuesta() {
            if (this.answer === 'yes') return '¡Si!'
            if (this.answer === 'no') return '¡No!'
            if (this.answer === 'maybe') return '¡Tal vez!'
        }
    }

}
</script>

<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>