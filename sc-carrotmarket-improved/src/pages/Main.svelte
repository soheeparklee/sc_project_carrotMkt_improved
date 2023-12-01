<script>
  import { onMount } from 'svelte';

  //시계만들기
  const time = new Date();
  const hour = time.getHours();
  const min = time.getMinutes();
  //footer모듈화
  import Footer from '../components/Footer.svelte';
  //read data realtime database
  import { getDatabase, ref, onValue } from 'firebase/database';

  // let이 아닌 반응형 변수로 선언한다.
  // 반응형 변수란, DB에서 값을 받아서 값이 바뀌게 되면 이 변수를 렌더링하고 있는 태그에서 화면을 업데이트 한다.
  // items를 반응형 변수이자 빈 배열로 설정
  $: items = [];
  const db = getDatabase();
  const itemsRef = ref(db, 'items/');

  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      //json으로 정리해서 가지고 오는 방법
      const json = JSON.stringify(data);
      //obj로 감싸서 아이템들 list로 받아오기
      const obj = Object.values(data);

      //DB에서 값 받아와서 items반응형 변수이자 빈 배열에 넣으세요
      items = obj.reverse();
    });
  });

  //time
  function calcTime(timestamp) {
    const currentTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    //지금 시간 - 백엔드에서 받아온 게시물 입력한 시간
    const passedTime = new Date(currentTime - timestamp);
    const hour = passedTime.getHours();
    const min = passedTime.getMinutes();
    const sec = passedTime.getSeconds();

    if (hour > 0) return `${hour}시간 전 업로드 되었습니다. `;
    else if (min > 0) return `${min}분 전 업로드 되었습니다. `;
    else if (sec > 0) return `${sec}초 전 업로드 되었습니다. `;
    else return `방금 전 업로드 되었습니다. `;
  }
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
  <!-- main에서 item 배열 가지고 와서 보여주기
  each -->
  {#each items as item}
    <div class="item-box">
      <div class="item-box-image">
        <img src={item.imgUrl} alt={item.imgUrl} />
      </div>
      <div class="item-box-desc">
        <div class="desc-title">{item.title}</div>
        <div class="desc-price">{item.price}</div>
        <div class="desc-time">{calcTime(item.insertAt)}</div>
        <div class="desc-location">{item.place}</div>
        <div class="desc-description">{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="write-btn" href="/#/write"> + 글쓰기</a>
</main>

<Footer where="main" />

<div class="size-adjust">사이즈를 조정해 주세요</div>
