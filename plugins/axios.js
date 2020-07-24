export default ({
  $axios,
  store
}) => {
  $axios.interceptors.request.use(
    (config) => {
      console.log('request')
      store.dispatch('setLoader')

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  $axios.interceptors.response.use(
    (response) => {
      store.dispatch('UnsetLoader')
      console.log('response')

      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
