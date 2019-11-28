$(document).ready(function(){
    /* Slick */
    $('.slider').slick({
        autoplay: true
    });
        
    /* Mask */
    $('#telefone').mask('(00) 0000-0000');

    /* WOW */
    new WOW().init();
    $('section, figure').each(function (){
        $(this).addClass("wow slideInUp");
    });

    /* Contador formulário */
    var spanMaximo = $("#maximo");
    var spanCaracteres = $("#caracteres");
    var textMensagem = $("#mensagem");

    /* Determinando a quantidade de caracteres que o campo usará */
    var quantidade = parseInt(spanMaximo.find("b").text());

    /* Manipulando/Monitorando a digitação no campo */
    textMensagem.on("input", function(){
        
        /* Capturando em tempo real o que é digitado */
        var conteudoMensagem = textMensagem.val();

        /* Gerando uma contagem regressiva */
        var contagem = quantidade - conteudoMensagem.length;
        /* console.log(contagem); */

        /* Atualizando a exibição de caracteres */
        spanCaracteres.text(contagem);

        /* DESAFIO: implementar a mudança de cor
        ao atingir o limite */
        if(contagem !== 0){
            spanMaximo.css("color","black");
        } else {
            spanMaximo.css("color","red");
        }
    });
}); 

