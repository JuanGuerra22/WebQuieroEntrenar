import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"
import { auth } from './firebase.js';
import {mensajes} from './mensajes.js';


// Selección del formulario
const registroForm = document.querySelector('#registro-form');

// Manejar el evento de envío del formulario
registroForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto
    //captura el email y el password del formulario 
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;

    console.log(email, password)

    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user);
        registroForm.reset(); //para limpiar los campos del formulario 
        mensajes("Hola " + user.user.email + " tu solicitud fue enviada")

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
    }
});




  // Validación básica
 // if (email && password) {
  //  console.log('Login exitoso'); // Puedes manejar la lógica de autenticación aquí
   // irHomePrincipal(); // Redirigir al home principal
 // } else {
 //   alert('Por favor, completa todos los campos.');
 // }
//});