const form= document.querySelector("#signup-form")

function checkPasword(){
    const formData= new FormData(form);
    const password1= formData.get("password");
    const password2= formData.get("password2");
    if (password1 === password2){
        return true;
    } else return false;
}

async function handleSubmit(event){
    event.preventDefault();
    const formData= new FormData(form);

    const sha256password= sha256(formData.get("password"))
    formData.set("password", sha256password)

    
    const passwordReturn= document.querySelector("#passwordReturn");
    

    if(checkPasword()){
        
    const res= await fetch("/signup", {
        method: "post",
        body: formData,
    })
    const data= await res.json();
        if(data === "200"){
        alert("signup success! you can log in")
        window.location.pathname = "/login.html";
        } 
    } else {
        passwordReturn.innerText= "Password does not match";
        passwordReturn.style.color= "tomato"
    }
}

form.addEventListener("submit", handleSubmit)