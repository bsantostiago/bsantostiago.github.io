const form = document.querySelector("form");

// Usados no ajax/cep
const inputCep = form.querySelector("#cep");
const inputTelefone = form.querySelector("#telefone");
const inputEndereco = form.querySelector("#endereco");
const inputBairro = form.querySelector("#bairro");
const inputCidade = form.querySelector("#cidade");
const inputEstado = form.querySelector("#estado");
const bStatus = form.querySelector("#status");
const botaoLocalizar = form.querySelector("#localizar-cep");

// Usados no contador de caracteres (passar se der tempo, passar HTML antes)
const spanMaximo = form.querySelector("#maximo");
const bCaracteres = form.querySelector("#caracteres");
const textMensagem = form.querySelector("#mensagem");


/* Script para o contador de caracteres */
// Determinando a qtd de caracteres
let quantidade = 100;

// Evento para detectar entrada (digitação) no campo
textMensagem.addEventListener("input", function(){
    // Captura em tempo real
    //console.log(textMensagem.value);
    let conteudo = textMensagem.value;

    // Criando uma contagem regressiva
    let contagem = quantidade - conteudo.length;

    console.log(contagem);
    bCaracteres.textContent = contagem;

    if(contagem == 0){
        bCaracteres.style.color = "red";
        textMensagem.style.boxShadow = "red 0 0 10px";
    } else {
        bCaracteres.style.color = "black";
        textMensagem.style.boxShadow = "black 0 0 10px";
    }
});


/* AJAX */
botaoLocalizar.addEventListener("click", function(event){
    event.preventDefault();

    /* Capturando o cep digitado no campo */
    let cep = inputCep.value;

    /* Montar a url de consulta ao webservice */
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    /* Criar a comunicação com o ViaCEP (usando Ajax/Fetch API) */
     /* 1) Acessando/conectando com o arquivo (ou API) */
    fetch(url)

        /* 2) E então pegamos a resposta do fetch e garantimos sua transformação em formato JSON */
        .then(function(resposta){
            return resposta.json();
        })
        
        /* 3) E então pegamos os dados da resposta */
        .then(function(dados){
            console.log(dados);
            if( !("erro" in dados) ){
                bStatus.innerHTML = "Cep encontrado!";
                inputEndereco.value = dados.logradouro;
                inputBairro.value = dados.bairro;
                inputCidade.value = dados.localidade;
                inputEstado.value = dados.uf;
            } else {
                bStatus.innerHTML = "Cep não encontrado!";
                form.reset();
                inputCep.focus();
            }
        });
});


VMasker(inputCep).maskPattern("99999-999"); // masking the input
VMasker(inputTelefone).maskPattern("(99) 9999-9999"); // masking the input


/* Formspree */
async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      status.innerHTML = "Thanks for your submission!";
      form.reset()
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  form.addEventListener("submit", handleSubmit)
