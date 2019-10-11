<template>
  <label :for="uuid">
    {{question.label}}
      <Answer 
        v-for="(answer, key) in question.answers" 
        :answer="answer"
        :key="key"
        :value="key"
        :question-index="index"
      ></Answer>
  </label>
</template>

<script>
import Answer from './Answer'
export default {
  name: 'Question',
  components: {
    Answer
  },
  props: {
    question: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      selectedAnswerIndex: -1
    }
  },
  watch: {
    selectedAnswerIndex (newVal, oldVal) {
      console.log('selecting answer')
      this.$store.dispatch('WeightedList/setWeight', {
        questionId: this.index,
        answerId: newVal
      })
    }
  },
  computed: {
    uuid () {
      return 'question-' + this.index
    },
    answerIndex: {
      get () {
        return this.$store.state.WeightedList.questions[this.index].selectedAnswerIndex
      },
      set (value) {
        this.$store.dispatch('WeightedList/answer', {
          questionId: this.index,
          answerId: value
        })
      }
    }
  },
  created () {
    this.$store.dispatch('WeightedList/reset')
  }
}
</script>

<style lang="scss">
  label {
    font-weight: 400;
    margin-bottom: 1em;
    font-size: 1em;
    radiogroup { 
      font-size: 1em; 
      margin-top: 1em;
      display: block;
      padding: 0.5em;
      width: 100%;
    }
  }
</style>