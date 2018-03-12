 $(document).ready(function () {
     $("#cnpj").blur(validaCNPJ);
     $("#cpf").blur(validaCPF);
     buscaempresa();
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
    swal({
      title: "Deseja alterar seus dados?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((confirma) => {
      if (confirma) {
        alterarempresa();
      }
    });   
});

function alterarempresa(){    
    var dados = formToJSON("#formcadastroestabelecimento");
    var parametros = JSON.stringify(dados); 
    console.log(parametros);
    $.ajax({
        type: 'POST',
        url: urlapp+'empresa/alterar',
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem('auth')
        },
        data: parametros,
        success: function(data, textStatus, jQxhr) {
            swal("Dados Alterados!","Os dados foram alterados.","success");
        },
        error: function(jqXhr, textStatus, errorThrown) {
            swal("Ocorreu um problema",jqXhr.responseText,"error");
        }
    }); 
}

function buscaempresa(){
    $.ajax({
        type: 'GET',
        url: urlapp+'empresa/empresaAlteracao',
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem('auth')
        },
        success: function(data, textStatus, jQxhr) {
            var empresa = data;
            $("[name=id]").val(empresa.id);
            $("[name=nome]").val(empresa.nome);
            $("[name=cnpj]").val(empresa.cnpj);
            $("[name=cep]").val(empresa.cep);
            $("[name=uf]").val(empresa.uf);
            $("[name=cidade]").val(empresa.cidade);
            $("[name=bairro]").val(empresa.bairro);
            $("[name=endereco]").val(empresa.endereco);
            $("[name=numero]").val(empresa.numero);
            $("[name=telefone_contato]").val(empresa.telefone_contato);
            $("[name=email_contato]").val(empresa.email_contato);
            $("[name=responsavel]").val(empresa.responsavel);
            $("[name=cpf]").val(empresa.cpf);
            $("[name=dt_nascimento]").val(empresa.dt_nascimento);

        },
        error: function(jqXhr, textStatus, errorThrown) {
            swal("Ocorreu um problema",jqXhr.responseText,"error");
        }
    }); 
}
