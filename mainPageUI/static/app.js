
const form= document.querySelector("#write_form");

async function handleSubmit(event){
    event.preventDefault();

    const body= new FormData(form);
    //insertat
    body.append("insertat", new Date().getTime());
    try{
    const res= await fetch("/items", {
        method: "POST", 
        body: body,
});
    const data= await res.json();

    if(data === "200")
        window.location.pathname= "/login.html";

    } catch(e){
        console.error(e);
    }

    console.log("item submitted");
};

const submitBtn= document.querySelector(".submit_btn")
submitBtn.addEventListener("submit", handleSubmit);