<script>
  import Footer from '../components/Footer.svelte';
</script>

<form id="signup-form" action="/signup" method="POST">
  <h1>Sign Up here</h1>
  <div>
    <label for="id">ID</label>
    <input type="text" id="id" name="id" />
  </div>
  <div>
    <label for="password">PASSWORD</label>
    <input type="password" id="password" name="password" />
  </div>
  <div>
    <label for="password2">PASSWORD CHECK</label>
    <input type="password" id="password2" name="password2" />
  </div>
  <div>
    <label for="name">NAME</label>
    <input type="text" id="name" name="name" />
  </div>
  <div>
    <label for="email">EMAIL</label>
    <input type="email" id="email" name="email" />
  </div>
  <div>
    <div class="passwordCheck">
      <button type="submit">sign up button</button>
    </div>
    <div id="passwordReturn"></div>
  </div>
</form>

<Footer />
