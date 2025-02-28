
import {  } from "./registro-form.js";


// Redirigir a la página principal del home
function irHomePrincipal() {
  window.location.href = "home-principal.html"; 
}
// Redirigir a la página de registro
function irRegistro() {
  window.location.href = "registro-form.html";
}

// Añadir funcionalidad de expansión a las tarjetas
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Alterna la clase 'card-expandida' al hacer clic
    card.classList.toggle('card-expandida');
  });
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






//---------------------- Popup ---------------------- 

document.querySelectorAll(".material-symbols-outlined").forEach(icon => {
  icon.addEventListener("click", function() {
      let popupId = this.getAttribute("data-popup");
      document.getElementById(popupId).style.display = "block";
  });
});

function cerrarPopup(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {
  document.querySelectorAll(".popup").forEach(popup => {
      if (event.target === popup) {
          popup.style.display = "none";
      }
  });
};


