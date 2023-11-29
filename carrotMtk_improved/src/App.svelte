<script>
  import Main from './pages/Main.svelte';
  import Login from './pages/Login.svelte';
  import Signup from './pages/Signup.svelte';
  import Write from './pages/Write.svelte';
  import Notfound from './pages/Notfound.svelte';
  import Router from 'svelte-spa-router';

  const routes = {
    '/': Main,
    '/login': Login,
    '/signup': Signup,
    '/write': Write,
    '*': Notfound,
  };

  import './css/style.css';
</script>

<Router {routes} />

<main></main>

<style>
</style>
