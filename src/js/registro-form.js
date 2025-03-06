import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { auth, db } from './firebase.js';
import {mensajes} from './mensajes.js';



    // Selección del formulario
const registroForm = document.getElementById('registroForm');
const spinner = document.getElementById("spinner-container");

//El if valida si se encuentra el formulario 
if(registroForm){ 
    // Manejar el evento de envío del formulario

registroForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto
    //captura el email y el password del formulario 
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;

    // Validación antes de enviar los datos a Firebase
    if (!email || !password) {
        mensajes("Por favor, complete todos los campos", "fail");
        return;
      }

       
  
      // Validar que la contraseña tenga al menos 6 caracteres
      if (password.length < 6) {
        mensajes("La contraseña debe tener al menos 6 caracteres", "fail");
        return;
      }

    console.log(email, password)

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredentials);
        // Mostrar el spinner y deshabilitar el botón mientras se procesa la solicitud
        spinner.classList.remove("hidden");
        // Guardar información adicional en Firestore
        await setDoc(doc(db, "usuarios", userCredentials.user.uid), {
            email: email,
            nombre: "",      // Se puede actualizar más tarde
            peso: "",        // Se puede actualizar más tarde
            fNacimiento: "",    // Se puede actualizar más tarde
            fechaRegistro: new Date()
        });

        mensajes("Hola " + userCredentials.user.email + " tu solicitud fue enviada Satisfactoriamente");
        registroForm.reset(); //para limpiar los campos del formulario 



        // Redirigir a la página de login después de 2 segundos
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);

    } catch (error) {
        console.log(error.code)
        if(error.code === 'auth/email-already-in-use'){
            mensajes("El usuario ya se encuentra registrado", 'fail');
        }
       else if(error.code === 'auth/invalid-email'){
            mensajes("Su email no es correcto", 'fail');
        } else if (error.code === 'auth/weak-password'){
            mensajes("Su contraseña es muy corta", 'fail');
        } else{
            mensajes("Algo salió mal, Intenta nuevamente", 'fail');
        }
    }finally {
        // Ocultar el spinner después de la autenticación (sea éxito o error)
        spinner.classList.add("hidden");
    }
});
} else{
    console.error('No se encontró el formulario de registro')
}

