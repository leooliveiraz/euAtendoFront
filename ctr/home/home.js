$("#botaopesquisar").click(function (event) {
    event.isDefaultPrevented();
    busca = $("#campopesquisa").val();    
    $(location).attr('href', '../apresentacao/estabelecimentos.html?consulta='+busca);
});
$("#formpesquisa").submit(function (event) {
    event.isDefaultPrevented();
    $("#botaopesquisar").click();
});