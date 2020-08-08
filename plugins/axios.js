export default ({
  $axios,
  store
}) => {
  $axios.interceptors.request.use(
    (config) => {

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


      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
