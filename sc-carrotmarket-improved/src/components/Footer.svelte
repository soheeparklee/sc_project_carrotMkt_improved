<script>
  export let where;

  const moveToMain = () => {
    window.location.hash = '/';
  };
</script>

<footer>
  <button class="footer-box" on:click={moveToMain}>
    <div class="footer-box-icons">
      {#if where === 'main'}
        <img src="./assets/home.svg" alt="home" />
      {:else}
        <img src="./assets/house_outline.svg" alt="house_outline" />
      {/if}
    </div>
    <div class="footer-box-title">홈</div>
  </button>

  <div class="footer-box">
    <div class="footer-box-icons">
      <img src="./assets/paper.svg" alt="paper" />
    </div>
    <div class="footer-box-title">동네생활</div>
  </div>

  <div class="footer-box">
    <div class="footer-box-icons">
      <img src="./assets/map.svg" alt="map" />
    </div>
    <div class="footer-box-title">내 근처</div>
  </div>

  <div class="footer-box">
    <div class="footer-box-icons">
      <img src="./assets/chat.svg" alt="chat" />
    </div>
    <div class="footer-box-title">채팅</div>
  </div>

  <div class="footer-box">
    <div class="footer-box-icons">
      <img src="./assets/user.svg" alt="user" />
    </div>
    <div class="footer-box-title">나의 당근</div>
  </div>
</footer>
