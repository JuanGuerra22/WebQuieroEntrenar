import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";





// Verificar el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html"; // Redirigir al login si no está autenticado
    } 
  });
  

//verifico si el usuario es administrador 
auth.onAuthStateChanged(async (user) =>{
    if(user){
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);
        const nombreAdmin = document.getElementById('nombre-admin');
        const emailAdmin = document.getElementById('email-admin');

        

        if(userSnap.exists() && userSnap.data().rol === "admin"){
            const data = userSnap.data() || 'Registra tu nombre';
            nombreAdmin.textContent = data.nombre;
            emailAdmin.textContent = data.rol;
            document.getElementById('admin-section').style.display = "flex";
            console.log("Rol del usuario:", userSnap.data().rol);
        } else {
            console.log("El usuario no es administrador.");
        }
    } else {
        console.log("No hay usuario autenticado.");
    }
});



const enfoque = document.getElementById('enfoque');
const textEjercicio = document.getElementById('text-ejercicio');
const contEjercicios = document.getElementById('cont-ejercicios');

enfoque.addEventListener("change", () =>{
    if(enfoque.value !== ''){
        textEjercicio.textContent = enfoque.value;
        contEjercicios.style.display = "flex";
    }   else{
        textEjercicio.textContent = "";
    }
    
});

const contInput = document.getElementById('cont-input');
const addExerciseBtn = document.getElementById('add-exercise');

function AddInput(){
    const newInput = document.createElement('input');
    ;
    newInput.type = "text";
    newInput.placeholder = "Nombre del ejercicio"

    const newCheck = `
        <span class="material-symbols-outlined confirm" style="color:#1be500;">check_circle</span>
        <span class="material-symbols-outlined confirm" style="color:#e50000;">cancel</span>
    `   

    contInput.appendChild(newInput);
    contInput.insertAdjacentHTML('beforeend', newCheck);
}

addExerciseBtn.addEventListener('click', AddInput);
