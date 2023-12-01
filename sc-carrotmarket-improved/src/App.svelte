<script>
  import Signup from './pages/Signup.svelte';
  import Write from './pages/Write.svelte';
  import Main from './pages/Main.svelte';
  import Login from './pages/Login.svelte';
  import Mypage from './pages/Mypage.svelte';
  import Notfound from './pages/Notfound.svelte';
  import Loading from './pages/Loading.svelte';

  import Router from 'svelte-spa-router';

  import './css/style.css';
  import './css/header.css';

  const routes = {
    '/': Main,
    '/write': Write,
    '/signup': Signup,
    '/mypage': Mypage,
    '*': Notfound,
  };

  //authetication
  import { user$ } from './store.js';

  //화면 로딩 되는 사이에 로그인 페이지 잠깐 보이는게 싫음
  let isLoading = true;

  //token가지고 있으면 로그인
  import {
    GoogleAuthProvider,
    signInWithCredential,
    getAuth,
  } from 'firebase/auth';

  import { onMount } from 'svelte';

  const auth = getAuth();

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    //만약 token없으면 그냥 함수 return
    if (!token) return (isLoading = false);

    // Sign in with credential from the Google user.
    const credential = GoogleAuthProvider.credential(null, token);
    const result = await signInWithCredential(auth, credential);
    const user = result.user;
    user$.set(user);
    isLoading = false;
  };

  //화면 새로 나올 checkToken() 때마다 함수 실행
  onMount(() => checkToken());
</script>

<!-- 로그인이 되어 있지 않으면 로그인 페이지로, 로그인이 되면 routes -->
{#if isLoading}
  <Loading />
{:else if !$user$}
  <Login />
{:else}
  <Router {routes} />
{/if}

<main>
  <div></div>
</main>

<style>
</style>
