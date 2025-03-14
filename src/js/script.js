import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { doc, getDoc, } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { auth, db} from "./firebase.js";
import './cerrar-sesion.js';



// Verificar el estado de autenticación y si es admin
export const adminVerificar =  auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = "login.html"; // Redirigir al login si no está autenticado
      return;
    } 
    const admin = document.getElementById('admin');
    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);
  
    if(userSnap.exists() && userSnap.data().rol === "admin"){
      admin.innerHTML = `
        <a id="admin-btn" href="home-admin.html"><span class="material-symbols-outlined">manage_accounts</span>Admin</a>
      `
    }
  
  });



// Seleccionamos todas las tarjetas (botones) y las listas de ejercicios
const buttons = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.ejercicios');

// Añadir funcionalidad para mostrar y ocultar las listas de ejercicios
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Obtenemos el día actual desde el botón (usando su id)
    const dia = button.id.split('-')[1]; // Ejemplo: "btn-lunes" -> "lunes"
    const listaActual = document.getElementById(`ejer-${dia}`);

    // Si la lista actual ya está visible, la ocultamos
    if (listaActual.classList.contains('visible')) {
      listaActual.classList.remove('visible');
      return; // Salimos para evitar ejecutar el código de mostrar otra lista
    }

    // Ocultamos todas las listas de ejercicios
    lists.forEach((lista) => {
      lista.classList.remove('visible');
    });

    // Mostramos la lista correspondiente al día seleccionado
    if (listaActual) {
      listaActual.classList.add('visible');
    }
  });
});




//para mostrar el nombre del usuario en la pagina principal 
 auth.onAuthStateChanged(async (user) => {
  if (user) {
      const userName = document.getElementById("user-name");
      if(userName){
        userName.textContent = `Bienvenido, ${user.email}`;
      }
      
  } else {
      window.location.href = "login.html";
  }
});







//---------------------- Popup ---------------------- 
function cerrarPopup(id) {
  document.getElementById(id).style.display = "none";
} 
window.cerrarPopup = cerrarPopup; // Hacerla accesible globalmente


document.querySelectorAll(".gift").forEach(icon => {
  icon.addEventListener("click", function() {
      let popupId = this.getAttribute("data-popup");
      document.getElementById(popupId).style.display = "block";
  });
});



window.onclick = function(event) {
  document.querySelectorAll(".popup").forEach(popup => {
      if (event.target === popup) {
          popup.style.display = "none";
      }
  });
};


