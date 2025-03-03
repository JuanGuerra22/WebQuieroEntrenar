import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { auth, db } from "./firebase.js";
import { mensajes } from "./mensajes.js";

const loginForm = document.querySelector("#loginForm");
const spinner = document.getElementById("spinner-container");


if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        if (!email || !password) {
            mensajes("Por favor, completa todos los campos", "fail");
            return;
        }
         // Mostrar el spinner y deshabilitar el botón mientras se procesa la solicitud
            spinner.classList.remove("hidden");

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            console.log("Usuario autenticado:", user.email);

            // Verificar si el usuario ya tiene un documento en Firestore
            const userDocRef = doc(db, "usuarios", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            console.log("¿El usuario tiene datos en Firestore?:", userDocSnap.exists());

            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    nombre: "",
                    peso: "",
                    altura: "",
                    fechaRegistro: new Date(),
                });
                console.log("Se creó el documento en Firestore para el usuario existente.");
            }

            setTimeout(() => {
                window.location.href = "home-principal.html";
            }, 1000);
        } catch (error) {
            console.log("Error de autenticación:", error.code);

            switch (error.code) {
                case "auth/invalid-credential":
                case "auth/wrong-password":
                    mensajes("Usuario o contraseña incorrectos", "fail");
                    break;
                case "auth/user-disabled":
                    mensajes("Cuenta deshabilitada. Contacta al soporte.", "fail");
                    break;
                case "auth/user-not-found":
                    mensajes("No existe una cuenta con este correo", "fail");
                    break;
                default:
                    mensajes("Error al iniciar sesión. Inténtalo de nuevo", "fail");
            } 
        } finally {
            // Ocultar el spinner después de la autenticación (sea éxito o error)
            spinner.classList.add("hidden");
        }
    });
} else {
    console.error("No se encontró el formulario de login.");
}
