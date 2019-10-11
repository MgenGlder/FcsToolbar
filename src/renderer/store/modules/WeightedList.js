const state = {
  questions: [
    {
      label: 'How are you feeling today',
      ordinal: 1,
      selectedWeight: 0,
      selectedAnswerIndex: -1,
      answers: [
        {text: 'Okay', weight: 9},
        {text: 'Pretty good', weight: 10},
        {text: 'Awesome', weight: 11}
      ]

    },
    {
      label: 'What did you have for breakfast',
      ordinal: 2,
      selectedWeight: 0,
      selectedAnswerIndex: -1,
      answers: [
        {text: 'Nothing', weight: 2},
        {text: 'Junk food', weight: 22},
        {text: 'Healthy stuff', weight: 24}
      ]

    },
    {
      label: 'How much do you like dogs',
      ordinal: 3,
      selectedWeight: 0,
      selectedAnswerIndex: -1,
      answers: [
        {text: 'Not really', weight: 4},
        {text: 'A lot', weight: 19},
        {text: 'Cats are superior', weight: -9000}
      ]
    }
  ]
}

const getters = {
  sevScore: state => {
    return state.questions.reduce((score, question) => {
      if (question.selectedAnswerIndex === -1) { return score + 0 }
      return score + question.answers[question.selectedAnswerIndex].weight
    }, 0)
  }
}

const mutations = {
  SET_WEIGHT (state, payload) {
    state.questions[payload.questionId].selectedWeight =
     state.questions[payload.questionId].answers[payload.answerId].weight
  },
  ANSWER (state, payload) {
    state.questions[payload.questionId].selectedAnswerIndex = payload.answerId
  },
  RESET (state) {
    state.questions.forEach(question => {
      question.selectedWeight = 0
      question.selectedAnswerIndex = -1
    })
  }
}

const actions = {
  setWeight ({ commit }, payload) {
    console.log('Dispatching')
    commit('SET_WEIGHT', payload)
  },
  reset ({commit}) {
    commit('RESET')
  },
  answer ({commit}, payload) {
    console.log('committing mutation to answer', payload)
    commit('ANSWER', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
