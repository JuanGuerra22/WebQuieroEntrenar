import{signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { mensajes } from "./mensajes.js";


const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

     // Validación: evitar que se envíen campos vacíos
     if (!email || !password) {
        mensajes("Por favor, completa todos los campos", "fail");
        return;
    }

    console.log(email, password);

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado:", userCredentials.user);
        
         // Mostrar mensaje de éxito
         mensajes("Inicio de sesión exitoso", "success");

         // Limpiar el formulario
         loginForm.reset();
 
         // Redirigir después de 1.5 segundos
         setTimeout(() => {
             window.location.href = "home-principal.html";
         }, 1500);

    } catch (error) {
        console.log("Error de autenticación:", error.code);
       // Manejo detallado de errores
       switch (error.code) {
        case "auth/invalid-credential":
            mensajes("Usuario o contraseña incorrectos", "fail");
            break;
        case "auth/user-disabled":
            mensajes("Cuenta deshabilitada. Contacta al soporte.", "fail");
            break;
        case "auth/user-not-found":
            mensajes("No existe una cuenta con este correo", "fail");
            break;
        case "auth/wrong-password":
            mensajes("Contraseña incorrecta", "fail");
            break;
        default:
            mensajes("Error al iniciar sesión. Inténtalo de nuevo", "fail");
        }
    }
});
