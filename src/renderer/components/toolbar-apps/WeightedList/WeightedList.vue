<template>
    <form class="weighted-list">
        <legend>
            <h1>Impact: {{score}}</h1>
        </legend>
        <fieldset v-for="(question, key) in questions" :key="key">
            <question :question="question" :index="key" />
        </fieldset>
        <button @click="reset">Reset</button>
    </form>
</template>

<script>
import Question from './Question'

export default {
    name: 'WeightedList',
    components: {
        Question
    },
    data() {
        return {
            selected: 0
        }
    },
    computed: {
        questions() {
            return this.$store.state.WeightedList.questions
        },
        score() {
            return this.$store.getters['WeightedList/sevScore']
        }
    },
    methods: {
        uuid(key) {
            return 'question-' + key
        },
        reset() {
            this.$store.dispatch('WeightedList/reset')
        }
    }
}
</script>

<style lang="scss">
form {
    fieldset {
        padding: 1em;
        margin-bottom: 5px;
        border: 1px solid lightgrey;
    }
    button {
        padding: 1em;
        float: right;
    }
}
</style>