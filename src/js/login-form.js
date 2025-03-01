import{signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { mensajes } from "./mensajes.js";


const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log(email, password);

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials);
        
    } catch (error) {
        console.log(error.code);
        if(error.code === 'auth/invalid-credential'){
           mensajes('Usuario o contraseña Errados', 'fail')
        }
    }
});
