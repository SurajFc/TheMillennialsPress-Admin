export default (context, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('imageURL', 'https://api.themillennialspress.com/')
}
