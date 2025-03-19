import { auth, db } from "./firebase.js";
import { doc, getDoc, deleteDoc, addDoc, collection, onSnapshot, } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import './cerrar-sesion.js';
import { mensajes } from "./mensajes.js";
import{adminVerificar} from "./script.js"


//verifico si el usuario es administrador 
auth.onAuthStateChanged(async (user) =>{

    if (!user) {
        window.location.href = "login.html"; // Redirigir al login si no está autenticado
        return;
        } 
  
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);
        const nombreAdmin = document.getElementById('nombre-admin');
        const emailAdmin = document.getElementById('email-admin');

        if(userSnap.exists() && userSnap.data().rol === "admin"){
            const data = userSnap.data() || { nombre: "Registra tu nombre", rol: "admin" };
            nombreAdmin.textContent = data.nombre;
            emailAdmin.textContent = data.rol;
            console.log("Rol del usuario:", data.rol);
        } else {
            console.log("El usuario no es administrador.");
        } 
});

// Mostrar y ocultar la informacion de los botenes-----------------

const trainingBtn = document.querySelectorAll('.training-btn');
const contEntrenos = document.querySelectorAll('.cont-entrenos')

trainingBtn.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        const boton = btn.id.split('-')[1]; //Obtiene el ID del botón (btn.id) y lo divide en un array usando el guion - como separador. Luego, toma el segundo elemento del array (índice 1) y lo almacena en la constante boton. 
        const btnActual = document.getElementById(`cont-${boton}`); //Crea un ID dinámico usando la constante boton y selecciona el elemento HTML correspondiente usando document.getElementById(). Se asume que los IDs de los contenedores tienen el formato cont-algo, donde algo coincide con el segundo elemento del ID del botón.

        if(btnActual.classList.contains('visible')){
            btnActual.classList.remove('visible');
            return;
        }

         // Ocultamos todas las listas de ejercicios
        contEntrenos.forEach((entrenos)=>{
            entrenos.classList.remove('visible');
        })

        if(btnActual){
            btnActual.classList.add('visible');
        }
    });
});

// ----------------------------------------------------------------

//Escucha el cambio del Select 
const enfoqueEjer = document.getElementById('enfoque');
const contSuperior = document.getElementById('cont-superior');
const contInferior = document.getElementById('cont-inferior')
const selectSuperior = document.getElementById('musculos-superior');
const selectInferior = document.getElementById('musculos-inferior');
const addBtn = document.getElementById('addBtn');
const contAddBtn = document.getElementById('cont-addBtn');

enfoqueEjer.addEventListener("change", () =>{

    if(enfoqueEjer.value === ''){
        contSuperior.classList.add('hidden');
        contInferior.classList.add('hidden');

    } else if(enfoqueEjer.value === 'tren-superior'){
        contSuperior.classList.remove('hidden');
        contInferior.classList.add('hidden');
        selectInferior.value = '';
        selectSuperior.value = '';
        contAddBtn.classList.add('hidden');


    }else if(enfoqueEjer.value === 'tren-inferior'){
        contInferior.classList.remove('hidden')
        contSuperior.classList.add('hidden');
        selectInferior.value = '';
        selectSuperior.value = '';
        contAddBtn.classList.add('hidden');

    }else{
        contAddBtn.classList.add('hidden');
    } 
    
});

contSuperior.addEventListener('change', () => {
    if(selectSuperior.value === ''){
        contAddBtn.classList.add('hidden');
    } else{
        contAddBtn.classList.remove('hidden');
    }
});

contInferior.addEventListener('change', () => {
    if(selectInferior.value === ''){
        contAddBtn.classList.add('hidden');
    }else{
        contAddBtn.classList.remove('hidden');
    }
});
//Escucha el cambio del Select 




const contInputsIcons = document.getElementById('cont-inputs-icons');


let inputActivo = false; // Variable para controlar si hay un input activo

function AddInput(){
    if(inputActivo) return; // Si ya hay un input activo, no permite agregar otro

    inputActivo = true; // Indica que hay un input en proceso

    const contenedor = document.createElement("div");
    contenedor.classList.add("input-group");

    const newInput = document.createElement('input');
    newInput.type = "text";
    newInput.placeholder = "Nombre del ejercicio";
    newInput.id = "icon-confirm";

    const checkIcon = document.createElement("span");
    checkIcon.classList.add("material-symbols-outlined", "confirm");
    checkIcon.style.color = "#129c00";
    checkIcon.textContent = "check_circle";

    const cancelIcon = document.createElement("span");
    cancelIcon.classList.add("material-symbols-outlined", "confirm");
    cancelIcon.style.color = "#e50000";
    cancelIcon.textContent = "cancel";

    
    contInputsIcons.appendChild(contenedor);

    contenedor.appendChild(newInput);
    contenedor.appendChild(checkIcon);
    contenedor.appendChild(cancelIcon)

    // Evento para confirmar (check)  Funcionalidad Guardar nuevos ejercicios 
    checkIcon.addEventListener('click', async () => {
        const nombreEjercicio = newInput.value.trim();
    
        if (nombreEjercicio !== "") {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error("⛔ No hay usuario autenticado.");
                    return;
                }
    
                // Verificar si el usuario es administrador
                const userRef = doc(db, "usuarios", user.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists() || userSnap.data().rol !== "admin") {
                    mensajes("⛔ No tienes permisos para agregar ejercicios.", "fail");
                    console.error("⛔ No tienes permisos para agregar ejercicios.");
                    return;
                }
    
                const listaRef = collection(db, "ejercicios");
                console.log(listaRef.path);
    
                // Agregar el ejercicio a Firestore
                await addDoc(listaRef, {
                    nombre: nombreEjercicio,
                    enfoque: enfoqueEjer.value,
                    musculo: selectSuperior.value || selectInferior.value
                });
    
                mensajes("✅ Ejercicio agregado con éxito... ");
    
                // Eliminar input después de guardar
                contInputsIcons.removeChild(contenedor);
                inputActivo = false;
    
            } catch (error) {
                mensajes("⛔ Error al guardar el ejercicio:", "fail");
                console.error("⛔ Error al guardar el ejercicio:", error);
            }
        } else {
            mensajes("⚠️ El nombre del Ejercicio NO puede estar vacío", "fail");
        }
    });
    

                // Evento para cancelar (cancel)
                cancelIcon.addEventListener("click", () => {
                    contInputsIcons.removeChild(contenedor);
                    inputActivo = false; 
                });
}

addBtn.addEventListener('click', AddInput);


//Visiualizar los ejercicios en el Home-admin ---------------------------------

const contTrenSuperior = document.getElementById('cont-trenSuperior');
const contTrenInferior = document.getElementById('cont-trenInferior')

const mostrarEjercicios = () =>{
    const ejerciciosRef = collection(db, 'ejercicios');

    onSnapshot(ejerciciosRef, (snapshot) => {
        contTrenSuperior.innerHTML = "";
        contTrenInferior.innerHTML = "";
        snapshot.forEach((doc) =>{
            const ejercicio = doc.data();
            const ejercicioId = doc.id;

            if(ejercicio.enfoque === "tren-superior"){
                // Crear el div para cada ejercicio            
                const divTrenSuperior = document.createElement("div");
                divTrenSuperior.classList.add("div-tren-superior");
                divTrenSuperior.innerHTML = `
                    <p>${ejercicio.nombre}</p>
                    <span class="material-symbols-outlined" onclick="editarEjercicio('${ejercicioId}', '${ejercicio.nombre}')">edit</span>
                    <span class="material-symbols-outlined" onclick="mostrarModal('¿Estás seguro que deseas Eliminarlo?', () => { eliminarEjercicio('${ejercicioId}'); }, cancelarEliminar)">delete</span>
                    <input type="text" class="hidden">
                `;
                contTrenSuperior.appendChild(divTrenSuperior);

            } else if(ejercicio.enfoque === "tren-inferior"){
                 // Crear el div para cada ejercicio
             const divTrenInferior = document.createElement("div");
             divTrenInferior.classList.add("div-tren-inferior");
             divTrenInferior.innerHTML = `
                <p>${ejercicio.nombre}</p>
                <span class="material-symbols-outlined" onclick="editarEjercicio('${ejercicioId}', '${ejercicio.nombre}')">edit</span>
                <span class="material-symbols-outlined" onclick="mostrarModal('¿Estás seguro que deseas Eliminarlo?', () => { eliminarEjercicio('${ejercicioId}'); }, cancelarEliminar)">delete</span>
            `;
            contTrenInferior.appendChild(divTrenInferior);
            }  
        });
    });
     
}

    // Función para eliminar un ejercicio
    async function eliminarEjercicio (id) {
        await deleteDoc(doc(db, "ejercicios", id));
        mensajes("✅ Ejercicio Eliminado Correctamente");
    };

    const cancelarEliminar = ()=>{
        console.log("No se pudo elimiar el Ejercicio")
    }

     // Iniciar la función para mostrar ejercicios
     mostrarEjercicios();
 

   
// Hacer las funciones accesibles globalmente
window.eliminarEjercicio = eliminarEjercicio;
window.mostrarModal = mostrarModal;
window.cancelarEliminar = cancelarEliminar;


// Modal para confimación 
function mostrarModal(mensajeTexto, callbackAceptar, callbackCancelar){
    
    const modalConfirm = document.getElementById('modal-confirm');
    const mensajeModal = document.getElementById('mensaje-modal');
    const aceptarBtn = document.getElementById('aceptar-btn');
    const cancelarBtn = document.getElementById('cancelar-btn');

    mensajeModal.textContent = mensajeTexto;
    modalConfirm.style.display = "flex";

    aceptarBtn.onclick = function(){
        modalConfirm.style.display = "none";
        if(callbackAceptar){
            callbackAceptar();
        }
    };

    cancelarBtn.onclick = function(){
        modalConfirm.style.display = "none";
        if(callbackCancelar){
            callbackCancelar();
        }
    };
}

