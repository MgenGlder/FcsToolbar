<template>
  <label>
    <input type="radio" :value="value" v-model="answerIndex">
    {{answer.text}}
  </label>
</template>

<script>
  export default {
    name: 'Answer',
    props: {
      answer: {
        type: Object,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      questionIndex: {
        type: Number,
        required: true
      }
    },
    computed: {
      answerIndex: {
        get () {
          return this.$store.state.WeightedList.questions[this.questionIndex].selectedAnswerIndex
        },
        set (value) {
          this.$store.dispatch('WeightedList/answer', {
            questionId: this.questionIndex,
            answerId: value
          })
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  label {
    display: block;
    input {
      margin-right: 1em;
    }
  }
</style>