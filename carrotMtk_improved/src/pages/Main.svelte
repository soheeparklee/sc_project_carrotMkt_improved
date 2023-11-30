<script>
  let hour = new Date().getHours();
  let min = new Date().getMinutes();

  
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

<Footer />

<div class="size-adjust">사이즈를 조정해 주세요</div>
