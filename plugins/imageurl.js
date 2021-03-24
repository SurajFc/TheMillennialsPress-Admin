export default (context, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('imageURL', 'http://127.0.0.1:8000/')
}
