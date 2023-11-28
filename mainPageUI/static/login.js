const form= document.querySelector("#login-form")



async function handleSubmit(event){
    event.preventDefault();
    const formData= new FormData(form);
    const sha256Password= sha256(formData.get("password"));
    formData.set("password", sha256Password);


    const res= await fetch("/login",{
        method: "post",
        body: formData,
    })
    const data= await res.json();
    const accessToken= data.access_token;
    console.log(accessToken);
    window.localStorage.setItem("token", accessToken);

    window.location.pathname= "/"


    // accessToken있으니까 버튼 누르면 item보여줘
    //서버와 계속 연결 유지하기 위해 header안에 access token넣기
    // const infoDiv= document.querySelector("#info");
    // infoDiv.innerText = "login succeed"
    // const btn= document.createElement("button");
    // btn.innerText= "get item";
    // btn.addEventListener("click", async ()=>{
    //     const res= await fetch ("/items", {
    //         //add access token to header
    //         headers:{
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     });
    //     const data= await res.json();
    //     console.log(data);
    // });
    // infoDiv.appendChild(btn);

    // if(res.status === 200){
    //     alert("successfully logged in! Now you can write")
    //     window.location.pathname = "/write.html";
    // } else{
    //     alert("login failed. Check your ID or password again!")
    // }
}

form.addEventListener("submit", handleSubmit)