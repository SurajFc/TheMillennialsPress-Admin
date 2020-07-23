export default (context, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('imageURL', 'http://localhost:8000/')
}
