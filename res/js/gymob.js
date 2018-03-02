var urlapp = 'http://localhost:9000/';


function executaAjax(dado,metodo,caminho){
    var parametros = JSON.stringify(dado);
    var retorno = $.ajax({
        type: metodo,
        url: urlapp+caminho,
        contentType: "application/json",
        data: parametros,
        success: function(data, textStatus, jQxhr) {
            return data;

        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            console.log(jqXhr);
            console.log(textStatus);
        }
    }); 
    return retorno;
}

function formToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });
    return json;
}


/* LOADING */
$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
    ajaxStop: function() { $body.removeClass("loading"); }    
});

/* Menu Lateral */
function menulateral(){
    $("#wrapper").toggleClass("toggled");
};

$(document).ready(function(){
   $("header").load("../templates/cabecalho.html");
   $("#sidebar").load("../templates/sidebar.html");
   $("footer").load("../templates/rodape.html");   
   $("#fimsidebar").load("../templates/fimsidebar.html");
});

