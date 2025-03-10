import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { auth, db } from "./firebase.js";
import './cerrar-sesion.js';


const spinner = document.getElementById("spinner-container");

const editBtn = document.getElementById('editar-perfil');
const guardarBtn = document.getElementById('guardar-btn');

const email = document.getElementById('email');

const nombre = document.querySelectorAll('.nombre-usuario');
const nombreInput = document.getElementById('nombre-input');

const fNacimiento = document.getElementById('fecha-nacimiento');
const fNacimientoImput = document.getElementById('fecha-nacimiento-input');

const edad = document.getElementById('edad');

const peso = document.getElementById('peso');
const pesoInput = document.getElementById('peso-input');

let userRef; // Variable global para referencia del usuario en Firestore


// Espera a que Firebase cargue el usuario actual
auth.onAuthStateChanged(async (user) => {
    if (user) {
        console.log("✅ Usuario autenticado");
        
        userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();

            // Mostrar datos en la interfaz
            email.textContent = data.email || "No se encuentra tu Email";

            nombre.forEach(el => el.textContent = data.nombre || "Sin nombre");
            nombreInput.value = data.nombre || "";

            fNacimiento.textContent = data.fNacimiento || "Fecha sin registrar";
            fNacimientoImput.value = data.fNacimiento || "";

            edad.textContent = data.fNacimiento ? calcularEdad(data.fNacimiento) : "Cargando...";

            peso.textContent = data.peso ? `${data.peso} Kg` : "Sin peso registrado";
            pesoInput.value = data.peso || "";
            
            
        } else {
            console.log("No hay datos para este usuario en Firestore.");
        }
    } else {
        window.location.href = "login.html"; // Redirige si no está autenticado
    }
});



// Mostrar inputs para edición.
editBtn.addEventListener('click', ()=>{

    console.log("📝 Editando perfil...");

    nombre.forEach(el => el.classList.add('hidden'));
    nombreInput.classList.remove('hidden');

    fNacimiento.classList.add('hidden');
    fNacimientoImput.classList.remove('hidden');

    peso.classList.add('hidden');
    pesoInput.classList.remove('hidden');

    guardarBtn.classList.remove('hidden');
});


// Guardar cambios en Firestore
guardarBtn.addEventListener('click', async () =>{

    console.log("💾 Guardando cambios...");
    if (!userRef) return; 

     // Mostrar el spinner y deshabilitar el botón mientras se procesa la solicitud
     spinner.classList.remove("hidden");

    const nuevoNombre = nombreInput.value.trim();
    const nuevaFNacimiento = fNacimientoImput.value.trim();
    const nuevoPeso = pesoInput.value.trim();

    const nuevaEdad = nuevaFNacimiento ? calcularEdad(nuevaFNacimiento): "";

    try {
       // Solo actualizar los campos que tienen un valor
       const updates = {};
       if (nuevoNombre) updates.nombre = nuevoNombre;
       if (nuevaFNacimiento) updates.fNacimiento = nuevaFNacimiento;
       if (nuevoPeso) updates.peso = nuevoPeso;

       if (Object.keys(updates).length > 0) {
            await updateDoc(userRef, updates);
            console.log(" Perfil actualizado correctamente.");
   
       } else {
           console.log("⚠ No hay cambios que guardar.");
       }

       // Actualizar la interfaz con los nuevos valores
       if (nuevoNombre) nombre.forEach(el => el.textContent = nuevoNombre);
       if (nuevaFNacimiento) fNacimiento.textContent = nuevaFNacimiento;
       if (nuevaEdad) edad.textContent = nuevaEdad;
       if (nuevoPeso) peso.textContent = `${nuevoPeso} Kg`;

         // Ocultar inputs
         nombre.forEach(el => el.classList.remove('hidden'));
         nombreInput.classList.add("hidden");
 
         fNacimiento.classList.remove("hidden");
         fNacimientoImput.classList.add("hidden");
 
         peso.classList.remove("hidden");
         pesoInput.classList.add("hidden");
 
         guardarBtn.classList.add("hidden");
 
         console.log(" ✅ Perfil actualizado correctamente.");

    } catch (error) {
        console.error("Error al actualizar perfil:", error);
    }finally {
        // Ocultar el spinner siempre al final
        spinner.classList.add("hidden");
    }
});



// Función para calcular la edad
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad;
}