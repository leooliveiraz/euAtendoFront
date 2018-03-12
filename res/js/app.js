var urlapp = 'http://localhost:9000/';


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


$(document).ready(function(){
    if(localStorage.getItem("nomeestabelecimento") != null){
       $("header").load("../templates/cabecalhologado.html");
       $("footer").load("../templates/rodape.html");        
       $("#sair").click(sair());   
        setaNomeEmpresa();
    }else{
       $("header").load("../templates/cabecalho.html");
       $("footer").load("../templates/rodape.html");           
    }    
});


function setaNomeEmpresa(){
    if(localStorage.getItem("nomeempresa") == null){
        getNomeEmpresa();
    }else{
        $("#nomeestabelecimento").val(localStorage.getItem("nomeestabelecimento"));        
    }
}


function getNomeEmpresa(){    
    var parametros = localStorage.getItem('user');
    $.ajax({
        type: 'POST',
        url: urlapp+'usuario/buscarnome',
        data: parametros,
        headers:  { "Authorization" : localStorage.getItem('auth') },
        success: function(data, textStatus, jQxhr) {
            localStorage.setItem('nomeestabelecimento',data.toUpperCase());
            $("#nomeestabelecimento").text(data.toUpperCase());
        },
        error: function(jqXhr, textStatus, errorThrown) {
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
            localStorage.removeItem('password');
            localStorage.removeItem('nomeestabelecimento');
            $(location).attr('href', '../home/home.html');     
        }
    }); 
}


function sair(){
           localStorage.removeItem('auth');
            localStorage.removeItem('user');
            localStorage.removeItem('password');
            localStorage.removeItem('nomeestabelecimento');
            $(location).attr('href', '../home/home.html');    
     
}