// armazena o scrolltop do elemento que deseja aguardar
var paginaatual = 0;
var busca = "";
var carregando = false;
$(window).scroll(function () {
    var scrollTopoffset = $('#loadestabelecimento').offset().top - $(window).height();
    if ($(window).scrollTop() > scrollTopoffset) {
        // rolagem chegou ao elemento
        if (!carregando) {
            carregando = true;
            getEstabelecimentos();
            carregando = false;
        }
    }
});

$(document).ready(function () {
    pesquisaraoiniciar() ;
    getEstabelecimentos();
});




function getEstabelecimentos() {
    $.ajax({
        type: 'GET',
        data: {
            pagina: paginaatual,
            pesquisa: busca
        },
        async: false,
        url: urlapp + 'empresa/listarempresas',
        success: function (data, textStatus, jQxhr) {
            $(data).each(function () {
                var content = $("#rowempresa");
                var empresa = this;
                if (empresa.path_img == null) {
                    empresa.path_img = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
                }
                var cardempresa = '<div class="col-lg-6 cardempresa" id="empresa_' + empresa.id + '"> <div class="card"> <div class="card-body"> <div class="text-center cardlogoempresa"> <img class="rounded-circle img-thumbnail cardfotoempresa" src=' + empresa.path_img + ' alt="Generic placeholder image" width="190" height="190"> </div><br><h2 class="card-title text-center" id="nomehospital"></h2> <p class="card-text" id="endereco"> <i class="fas fa-map-marker-alt"></i> Endereço: </p><p class="card-text" id="telefones"> <i class="fas fa-phone-square"></i> Telefones: </p><p class="card-text" id="emails"> <i class="fas fa-envelope-square"></i> Emails: </p><p class="card-text" id="site"> <i class="fas fa-share-square"></i> Site:</p><div id="accordion"> <div class="card"> <a class="text-white " data-toggle="collapse" data-target="#collapseConvenios_' + empresa.id + '" aria- aria-controls="collapseConvenios_' + empresa.id + '"> <div class="card-header bg-primary tituloaccordion" id="headingOne"> Convênios </div></a> <div id="collapseConvenios_' + empresa.id + '" class="collapse " aria-labelledby="Convênios" data-parent="#accordion"> <div class="corpoaccordion"> <ul class="list-group list-group-flush" id="listaconvenios"> </ul> </div></div></div><div class="card"> <a class="text-white " data-toggle="collapse" data-target="#collapseEspecialidade_' + empresa.id + '" aria- aria-controls="collapseEspecialidade_' + empresa.id + '"> <div class="card-header bg-primary tituloaccordion" id="headingOne"> Especialidades </div></a> <div id="collapseEspecialidade_' + empresa.id + '" class="collapse " aria-labelledby="Especialidades" data-parent="#accordion"> <div class="corpoaccordion"> <ul class="list-group list-group-flush" id="listaespecialidade"> </ul> </div></div></div></div></div></div></div>';
                content.append(cardempresa);
                cardempresa = content.children("#empresa_" + empresa.id);
                cardempresa.find("#nomehospital").append(empresa.nome);
                cardempresa.find("#endereco").append(empresa.endereco + ", " + empresa.numero + ", " + empresa.bairro + ", " + empresa.cidade + " - " + empresa.uf);
                cardempresa.find("#telefones").append(empresa.telefone_contato);
                cardempresa.find("#emails").append(empresa.email_contato);
                if (empresa.site != null) {
                    cardempresa.find("#site").append('<a target="blank_" href="http://' + empresa.site + '"> ' + empresa.site + '</a>');
                } else {
                    cardempresa.find("#site").append(' Não informado');
                }
                // verifica convenios 
                if (jQuery.isEmptyObject(empresa.convenios)) {
                    cardempresa.find("#listaconvenios").append('<li class="list-group-item">Convênios não informados</li>');
                } else {
                    $(empresa.convenios).each(function () {
                        cardempresa.find("#listaconvenios").append('<li class="list-group-item">' + this.nome + '</li>');
                    });

                }
                // verifica especialidades
                if (jQuery.isEmptyObject(empresa.especialidades)) {
                    cardempresa.find("#listaespecialidade").append('<li class="list-group-item">Especialidades não informadas</li>');
                } else {
                    $(empresa.especialidades).each(function () {
                        cardempresa.find("#listaespecialidade").append('<li class="list-group-item">' + this.nome + '</li>');
                    });

                }
            });
            if (!$.isEmptyObject(data)) {
                paginaatual = paginaatual + 1;
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(jqXhr.responseText);
        }
    });
}

$("#botaopesquisar").click(function (event) {
    busca = $("#campopesquisa").val();
    paginaatual = 0;
    $("#rowempresa").text("");
    getEstabelecimentos();
});

function pesquisaraoiniciar() {
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        if(chave == "consulta") {
            var valor = chaveValor[1];
            busca = valor;
            $("#campopesquisa").val(valor);
        }
    });

    console.log(data);
}
