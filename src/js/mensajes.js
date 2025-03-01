
export function mensajes(mensaje, tipo = "success"){
    Toastify({
        text: mensaje,
        duration: 4000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: tipo === 'success' ? '#00D5E5': 'red',
          color: 'black'
        },
        onClick: function(){} // Callback after click
      }).showToast();
}