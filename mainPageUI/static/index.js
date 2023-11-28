//GET 

function calcTime(timestamp){
    const currentTime= new Date().getTime() - 9*60*60*1000;
    //지금 시간 - 백엔드에서 받아온 게시물 입력한 시간 
    const passedTime= new Date(currentTime - timestamp);
    const hour= passedTime.getHours();
    const min= passedTime.getMinutes();
    const sec = passedTime.getSeconds();

    if (hour>0) return `${hour}시간 전 업로드 되었습니다. `;
    else if (min > 0) return `${min}분 전 업로드 되었습니다. `;
    else if (sec>0 ) return `${sec}초 전 업로드 되었습니다. `;
    else return `방금 전 업로드 되었습니다. `
}

function renderData(data){
    const main= document.querySelector("main");
    data.reverse().forEach(async(obj) => {
        const itemBox= document.createElement("div");
        itemBox.className= "item-box"
        main.appendChild(itemBox);
        //image
        const itemBoxImage= document.createElement("div");
        itemBoxImage.className= "item-box-image";
        itemBox.appendChild(itemBoxImage);

        const img= document.createElement("img");
        img.className= "img";
        itemBoxImage.appendChild(img);

        //get image
        const res= await fetch (`/images/${obj.id}`)
        const blob = await res.blob();
        const url= URL.createObjectURL(blob);
        img.src= url;


        //desc
        const itemBoxDesc= document.createElement("div");
        itemBoxDesc.className= "item-box-desc";
        itemBox.appendChild(itemBoxDesc);


        //get innerHTML from BE
        const descTitle= document.createElement("div");
        descTitle.className= "desc-title";
        itemBoxDesc.appendChild(descTitle);
        descTitle.innerHTML= obj.title;

        const descPlace= document.createElement("div");
        descPlace.className= "desc-location";
        itemBoxDesc.appendChild(descPlace);
        descPlace.innerHTML= obj.place + "에서 거래합니다";

        const descTime= document.createElement("div");
        descTime.className= "desc-time";
        itemBoxDesc.appendChild(descTime);
        //add time info
        descTime.innerHTML= calcTime(obj.insertAt);

        const descPrice= document.createElement("div");
        descPrice.className= "desc-price";
        itemBoxDesc.appendChild(descPrice);
        descPrice.innerHTML = obj.price + "원";


        
    });
}

async function fetchList(){
    const accessToken= window.localStorage.getItem("token");
    
    const res= await fetch("/items", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    })
    
    if(res.status === 401){ 
        alert("로그인이 필요합니다!");
        window.location.pathname= "/login.html"
        return;
    }
    const data= await res.json();
    renderData(data);
}
fetchList();

