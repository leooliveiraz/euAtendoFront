var urlapp = 'http://localhost:9000/';


function formToJSON(form) {
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function () {
        json[this.name] = this.value || '';
    });
    return json;
}


/* LOADING */
$body = $("body");

$(document).on({
    ajaxStart: function () {
        $body.addClass("loading");
    },
    ajaxStop: function () {
        $body.removeClass("loading");
    }
});


$(document).ready(function () {
    if (localStorage.getItem("auth") != null) {
        $("header").load("../templates/cabecalhologado.html");
        $("footer").load("../templates/rodape.html");
        setaNomeEmpresa();
    } else {
        $("header").load("../templates/cabecalho.html");
        $("footer").load("../templates/rodape.html");
    }
});


function setaNomeEmpresa() {
    if (localStorage.getItem("nomeempresa") == null) {
        getNomeEmpresa();
    } else {
        $("#nomeestabelecimento").val(localStorage.getItem("nomeestabelecimento"));
    }
}


function getNomeEmpresa() {
    $.ajax({
        type: 'POST',
        url: urlapp + 'usuario/buscarnome',
        headers: {
            "Authorization": localStorage.getItem('auth')
        },
        success: function (data, textStatus, jQxhr) {
            localStorage.setItem('nomeestabelecimento', data.toUpperCase());
            $("#nomeestabelecimento").text(data.toUpperCase());
        },
        error: function (jqXhr, textStatus, errorThrown) {
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
            localStorage.removeItem('password');
            localStorage.removeItem('nomeestabelecimento');
            $(location).attr('href', '../home/home.html');
        }
    });
}


function sair() {
    swal("Deseja sair da sua conta?", {
            buttons: {
                cancel: "Não",
                sim: {
                    text: "Sim",
                    value: "sim",
                },
            },
        })
        .then((value) => {
            switch (value) {
                case "sim":
                    if ($("senha").val() == $("senha_confirmacao").val()) {
                        localStorage.removeItem('auth');
                        localStorage.removeItem('user');
                        localStorage.removeItem('password');
                        localStorage.removeItem('nomeestabelecimento');
                        $(location).attr('href', '../home/home.html');
                    } 
                    break;

            }
        });
}
