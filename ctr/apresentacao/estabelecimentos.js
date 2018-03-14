// armazena o scrolltop do elemento que deseja aguardar
var pagina = 0;
var carregando = false;
$(window).scroll(function() {
var scrollTopoffset = $('#loadestabelecimento').offset().top - $(window).height();
  if ($(window).scrollTop() > scrollTopoffset) {
  // rolagem chegou ao elemento
      if(!carregando){
        carregando = true;
        console.log("load");  
        carregando = false;        
      }
  }
});

 $(document).ready(function () {
    getEstabelecimentos(pagina);
 });




function getEstabelecimentos(){
    $.ajax({
        type: 'GET',
        url: urlapp+'empresa/listarempresas',
        success: function(data, textStatus, jQxhr) {
            $(data).each(function(){
                var content = $("#rowempresa");
                var empresa = this;
                console.log(empresa);
                var cardempresa ='<div class="col-lg-6 cardempresa" id="empresa_'+empresa.id+'"> <div class="card"> <div class="card-body"> <div class="text-center cardlogoempresa"> <img class="rounded-circle img-thumbnail " src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="190" height="190"> </div><br><h2 class="card-title text-center" id="nomehospital"></h2> <p class="card-text" id="endereco"> <i class="fas fa-map-marker-alt"></i> Endereço: </p><p class="card-text" id="telefones"> <i class="fas fa-phone-square"></i> Telefones: </p><p class="card-text" id="emails"> <i class="fas fa-envelope-square"></i> Emails: </p><p class="card-text" id="site"> <i class="fas fa-share-square"></i> Site:</p><div id="accordion"> <div class="card"> <a class="text-white " data-toggle="collapse" data-target="#collapseConvenios_'+empresa.id+'" aria- aria-controls="collapseConvenios_'+empresa.id+'"> <div class="card-header bg-primary tituloaccordion" id="headingOne"> Convênios </div></a> <div id="collapseConvenios_'+empresa.id+'" class="collapse " aria-labelledby="Convênios" data-parent="#accordion"> <div class="corpoaccordion"> <ul class="list-group list-group-flush" id="listaconvenios"> </ul> </div></div></div><div class="card"> <a class="text-white " data-toggle="collapse" data-target="#collapseEspecialidade_'+empresa.id+'" aria- aria-controls="collapseEspecialidade_'+empresa.id+'"> <div class="card-header bg-primary tituloaccordion" id="headingOne"> Especialidades </div></a> <div id="collapseEspecialidade_'+empresa.id+'" class="collapse " aria-labelledby="Especialidades" data-parent="#accordion"> <div class="corpoaccordion"> <ul class="list-group list-group-flush" id="listaespecialidade"> </ul> </div></div></div></div></div></div></div>';                
                content.append(cardempresa);
                cardempresa = content.children("#empresa_"+empresa.id);
                cardempresa.find("#nomehospital").append(empresa.nome);
                cardempresa.find("#endereco").append(empresa.endereco+", "+empresa.numero+", "+empresa.bairro+", "+empresa.cidade+" - "+empresa.uf);
                cardempresa.find("#telefones").append(empresa.telefone_contato);
                cardempresa.find("#emails").append(empresa.email_contato);
                if(empresa.site != null){
                    cardempresa.find("#site").append('<a target="blank_" href="http://'+empresa.site+'"> '+empresa.site+'</a>');
                }else{
                    cardempresa.find("#site").append(' Não informado');
                }
                // verifica convenios 
                if(jQuery.isEmptyObject(empresa.convenios)){
                    console.log("vazio");
                    cardempresa.find("#listaconvenios").append('<li class="list-group-item">Convênios não informados</li>');
                }else{
                    $(empresa.convenios).each(function(){
                        cardempresa.find("#listaconvenios").append('<li class="list-group-item">'+this.nome+'</li>'); 
                    });
                                       
                }
                // verifica especialidades
                if(jQuery.isEmptyObject(empresa.especialidades)){
                    console.log("vazio");
                    cardempresa.find("#listaespecialidade").append('<li class="list-group-item">Especialidades não informadas</li>');
                }else{
                    console.log(empresa.especialidades);
                     $(empresa.especialidades).each(function(){
                        cardempresa.find("#listaespecialidade").append('<li class="list-group-item">'+this.nome+'</li>'); 
                    });
                                       
                }
            });
        },
        error: function(jqXhr, textStatus, errorThrown) {
            swal("Ocorreu um problema",jqXhr.responseText,"error");
        }
    }); 
}