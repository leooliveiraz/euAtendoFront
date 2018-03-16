 $(document).ready(function () {
     $("#cnpj").blur(validaCNPJ);
     $("#cpf").blur(validaCPF);
     $("#email_login").blur(verificaUsuario);
 });

 function validaCNPJ() {
     if (validarCNPJ($("#cnpj").val())) {
         $("#cnpj").removeClass("is-invalid");
     } else {
         $("#cnpj").addClass("is-invalid");
     }
 }
 function validaCPF() {
    if (validarCPF($("#cpf").val())) {
         $("#cpf").removeClass("is-invalid");
     } else {
         $("#cpf").addClass("is-invalid");
     }
 }

$("#botaocadastrar").click(function(event){
    event.preventDefault();
    if($("#senha").val() == $("#senha_confirmacao").val()){
        $("#senha_confirmacao").removeClass("is-invalid");
        cadastroEmpresa();
    }else{
        $("#senha_confirmacao").addClass("is-invalid");
        swal("Senhas diferentes","Informe duas senhas iguais","error");
    }
});

function cadastroEmpresa(){    
    var dados = formToJSON("#formcadastroestabelecimento");
    var parametros = JSON.stringify(dados); 
    console.log(parametros);
    console.log(parametros.email_login);
    $.ajax({
        type: 'POST',
        url: urlapp+'empresa/cadastrar',
        contentType: "application/json",
        data: parametros,
        success: function(data, textStatus, jQxhr) {
            swal("Empresa cadastrada com sucesso!","Enviaremos um email para "+parametros.email_login+" para confirmar o cadastro.","success");
        },
        error: function(jqXhr, textStatus, errorThrown) {
            swal("Ocorreu um problema",jqXhr.responseText,"error");
        }
    }); 
}


function verificaUsuario(){    
    var parametros = $("#email_login").val();
    $.ajax({
        type: 'POST',
        url: urlapp+'usuario/verificaexistencia',
        data: parametros,
        success: function(data, textStatus, jQxhr) {
            if(data==true){                
                $("#email_login").addClass("is-invalid");
            }else{                
                $("#email_login").removeClass("is-invalid");
            }
        },
        error: function(jqXhr, textStatus, errorThrown) {
            console.log(textStatus);
        }
    }); 
}



$("#fileUpload").on('change', function () {
 
    if (typeof (FileReader) != "undefined") {
 
        var image_holder = $("#image-holder");
        image_holder.empty();
 
        var reader = new FileReader();
        reader.onload = function (e) {
            $("<img />", {
                "id": "imgfoto",
                "src": e.target.result,
                "class": "rounded-circle img-thumbnail imguploadempresa text-center"
            }).appendTo(image_holder);
            $("#fotoempresa").val(e.target.result);
        }
        image_holder.show();
        $("#wrapper").show();
        reader.readAsDataURL($(this)[0].files[0]);
        
        
    } else{
        console.log("Este navegador nao suporta FileReader.");
    }    
});


$("#botaoupload").click(function(event){
    event.preventDefault();
    $("#fileUpload").click();
});