import { login } from "./auth.js";
import { logout } from "./auth.js";
import { getUser } from "./auth.js";




const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const loginForm = document.querySelector('#loginForm')
const message = document.querySelector('#message')




loginForm.addEventListener('submit',async(e)=>{

e.preventDefault();

try{

const email=emailInput.value.trim()
const password=passwordInput.value

const result=await login(email,password)

if(result){


message.innerHTML = "Success! Redirecting..."
message.style.color = "green"
loginForm.reset();

setTimeout(() => {
                window.location.href = "./dashboard.html";
            }, 500);


}
}

catch(error) {
        console.error("UI Login Error Intercepted:", error);
        
        message.innerHTML = "Email or password incorrect!";
        message.style.color = "red";

        // Restore button state so the user can try again
        loginBtn.innerText = "Login";
        loginBtn.disabled = false;
    }

})  


