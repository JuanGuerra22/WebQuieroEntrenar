function irHomePrincipal(){
  window.location.href = "home-principal.html"
}

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('card-expandida');
  });
});


const btnDia = document.getElementById('btn-dia');
const elemento = document.getElementById('ejercicio');

btnDia.addEventListener('click', () => {
   // Comprobamos si la clase 'visible' está presente
  if(elemento.classList.contains('visible')){
     // Si está presente, la removemos
    elemento.classList.remove('visible');
  } else{
    elemento.classList.add('visible')
  }
  
});