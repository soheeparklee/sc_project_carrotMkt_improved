<script>
  let hour = new Date().getHours();
  let min = new Date().getMinutes();
  console.log(hour);
</script>

<header>
  <div class="info-bar">
    <div class="info-bar-time">{hour}:{min}</div>
    <div class="info-bar-icons">
      <img src="./assets/chart.svg" alt="network" />
      <img src="./assets/wifi.svg" alt="wifi" />
      <img src="./assets/battery.svg" alt="battery" />
    </div>
  </div>

  <div class="menu-bar">
    <div class="menu-bar-town">
      역삼 1동
      <img src="assets/chevron.svg" alt="chevron" />
    </div>
    <div class="menu-bar-icons">
      <img src="./assets/magnifying.svg" alt="magnifying" />
      <img src="./assets/bars.svg" alt="bars" />
      <img src="./assets/bell.svg" alt="bell" />
    </div>
  </div>
</header>
<main>
  <a class="write-btn" href="#/write"> + 글쓰기</a>
</main>
<footer>
  <div class="footer-box">
    <div class="footer-box-icons">
      <img src="./assets/home.svg" alt="home" />
    </div>
    <div class="footer-box-title">홈</div>
  </div>

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

<div class="size-adjust">사이즈를 조정해 주세요</div>
