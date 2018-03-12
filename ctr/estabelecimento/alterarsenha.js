$("#botao").click(function (event) {
    event.preventDefault();
    confirmar();
});

function confirmar() {
    swal("Deseja alterar sua senha?", {
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
                    if($("senha").val() == $("senha_confirmacao").val() ){
                        alterar();
                    }else{
                        swal("Senhas digitadas estão diferentes!", "Digite senhas iguais!", "error");                        
                    }
                    break;

            }
        });

}

function alterar(){
    var dados = formToJSON("#form");
    var parametros = JSON.stringify(dados); 
    console.log(parametros);
    $.ajax({
        type: 'POST',
        url: urlapp+'usuario/alterarsenha',
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem('auth')
        },
        data: parametros,
        success: function(data, textStatus, jQxhr) {
            swal("Dados Alterados!","Os dados foram alterados.","success");
        },
        error: function(jqXhr, textStatus, errorThrown) {
            swal("Ocorreu um problema",jqXhr,"error");
        }
    }); 
}