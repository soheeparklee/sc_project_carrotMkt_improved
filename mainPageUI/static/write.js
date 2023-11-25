
async function handleSubmit(event){
    event.preventDefault();

    const body= new FormData(form);
    //insertat
    body.append("insertAt", new Date().getTime());
    try{
    const res= await fetch("/items", {
        method: "POST", 
        body: body,
});
    const data= await res.json();

    if(data === "200")
        window.location.pathname= "/";

    } catch(e){
        console.error(e);
    }

    console.log("item submitted");
};


const form= document.querySelector("#write_form");
form.addEventListener("submit", handleSubmit);