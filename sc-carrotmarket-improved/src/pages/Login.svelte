<script>
  import Footer from '../components/Footer.svelte';

  //authentication social login
  import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

  //store user data in store.js
  import { user$ } from '../store';

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      localStorage.setItem('token', token);
      //save user data in store.js
      user$.set(user);
    } catch (error) {
      console.error(error);
      // ...
    }
  };
</script>

<!-- <form id="login-form" action="/login" method="POST">
  <h1>Welcome! Please Log-in</h1>
  <div>
    <label for="id">ID</label>
    <input type="text" id="id" name="id" />
  </div>
  <div>
    <label for="password">PASSWORD</label>
    <input type="password" id="password" name="password" />
  </div>
  <div>
    <button type="submit">login button</button>
  </div>
  <div id="info"></div>
</form> -->

<div>
  {#if $user$}
    <div>{$user$.displayName}님 어서오세요</div>
  {:else}
    <h1>Login with GOOGLE</h1>
    <button class="google-login-btn" on:click={loginWithGoogle}>
      <img
        class="google-login-btn-img"
        src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"
        alt=""
      />
      <div>구글로 시작하기</div>
    </button>
  {/if}
</div>

<Footer where="login" />

<style>
  .google-login-btn {
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    border: solid gray 1px;
    border-radius: 2px;
  }

  .google-login-btn-img {
    width: 20px;
    height: 20px;
  }
</style>
