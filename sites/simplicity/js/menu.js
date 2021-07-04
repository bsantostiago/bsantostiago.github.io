const nav = document.querySelector("nav");
const botao = nav.querySelector(".botao-menu");
const icone = botao.querySelector(".icone");
const menu = nav.querySelector(".menu");

botao.addEventListener("click", function (event){
  event.preventDefault();
  menu.classList.toggle("aberto");        

  if(menu.classList.contains("aberto")){
    icone.innerHTML = "Fechar &times;"
  } else {
    icone.innerHTML = "Menu &equiv;"
  }
});
