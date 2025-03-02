import { signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { auth } from "./firebase.js";
import { mensajes } from "./mensajes.js";


const salirIcon = document.getElementById('salir-icon');

if(salirIcon){
    salirIcon.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            mensajes("Has cerrado sesión correctamente", "success");
            // Redirigir al usuario a la página de inicio de sesión después de 1.5 segundos
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            mensajes("Error al cerrar sesión. Inténtalo nuevamente", "fail");
        }
    });
}
