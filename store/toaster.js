import {
  ToastProgrammatic as Toast
} from 'buefy'

const actions = {

  async Toast({
    context
  }, payload) {

    Toast.open({
      duration: 2800,
      message: payload ? payload.message : 'Sucess',
      position: 'is-top',
      type: payload ? payload.type : 'is-success'
    })
  }
}

export default {
  actions
}
