export default {
     methods:{
         async Toast({message,type}) {
               await  this.$buefy.toast.open({
                    duration: 2800,
                    message: message,
                    position: 'is-top',
                    type: type
                })
     }
}
}