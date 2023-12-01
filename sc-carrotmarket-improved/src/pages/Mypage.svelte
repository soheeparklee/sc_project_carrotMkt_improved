<script>
  import Footer from '../components/Footer.svelte';
  import { user$ } from '../store';

  const logout = () => {
    //1. token지우기
    localStorage.removeItem('token');
    //2. user정보 비워주기
    user$.set(null);
  };
</script>

<h1>My page</h1>

<button class="logout-btn" on:click={logout}>logout</button>

<Footer where="mypage" />

<style>
  .logout-btn {
    margin: 10px;
    border: solid 1px gray;
  }
</style>
