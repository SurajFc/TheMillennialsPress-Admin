import { ToastProgrammatic as Toast } from 'buefy'

const actions = {

    async Toast({context},payload){
     
        Toast.open({
            duration: 2800,
            message: payload.message || 'Sucess',
            position: 'is-top',
            type: payload.type || 'is-success'
        })
    }
}

export default {
    actions
}