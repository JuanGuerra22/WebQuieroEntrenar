import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { auth, db } from "./firebase.js";

// Espera a que Firebase cargue el usuario actual
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();

            // Asegurar que los elementos existan en el HTML antes de asignarles valores
            const nombreUser = document.getElementById("nombre");
            const emailUser = document.getElementById("email");
            const pesoUser = document.getElementById("peso");
            const alturaUser = document.getElementById("altura");

            if (nombreUser) nombreUser.textContent = data.nombre || "Sin nombre";
            if (emailUser) emailUser.textContent = data.email || "Correo no disponible";
            if (pesoUser) pesoUser.textContent = data.peso ? `${data.peso} kg` : "Sin peso registrado";
            if (alturaUser) alturaUser.textContent = data.altura ? `${data.altura} m` : "Sin altura registrada";
        } else {
            console.log("No hay datos para este usuario en Firestore.");
        }
    } else {
        window.location.href = "login.html"; // Redirige si no está autenticado
    }
});
