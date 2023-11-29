import App from './App.svelte'

//firebase
import "../firebase.js"

const app = new App({
  target: document.getElementById('app'),
})

export default app
