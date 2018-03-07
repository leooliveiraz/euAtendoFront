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