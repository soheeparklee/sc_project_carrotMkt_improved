<script>
  import Signup from './pages/Signup.svelte';
  import Write from './pages/Write.svelte';
  import Main from './pages/Main.svelte';
  import Login from './pages/Login.svelte';
  import Notfound from './pages/Notfound.svelte';

  import Router from 'svelte-spa-router';

  import './css/style.css';
  import './css/header.css';

  const routes = {
    '/': Main,
    '/login': Login,
    '/write': Write,
    '/signup': Signup,
    '*': Notfound,
  };
</script>

<Router {routes} />

<main>
  <div></div>
</main>

<style>
</style>
