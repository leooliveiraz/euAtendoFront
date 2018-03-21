 $(document).ready(function () {
     geralistaexameimg();
 });


$("#botaoadd").click(function () {
    $("#menuprincipal").toggle("slow");
    $("#menucadastro").removeClass("invisivel");
});


$("#cadastrar").click(function () {
    swal("Deseja realmente inserir esse Exame de Imagem?", {
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
                    cadastrarexameimg();
                    break;
            }
        });
});

$("#cancelar").click(function () {
    $("#menuprincipal").toggle("fast");
    $("#menucadastro").addClass("invisivel");
});


function cadastrarexameimg() {
    var dados = formToJSON("#formexameimg");
    var parametros = JSON.stringify(dados);
    $.ajax({
        type: 'POST',
        headers: {
            "Authorization": localStorage.getItem('auth')
        },
        url: urlapp + 'examesimg/cadastrar',
        contentType: "application/json",
        data: parametros,
        success: function (data, textStatus, jQxhr) {
            swal("Exame de Imagem cadastrado!", "", "success");
            $("#nomeexameimg").val("");
            $("#menuprincipal").toggle("slow");
            $("#menucadastro").addClass("invisivel");
            geralistaexameimg();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            swal("Ocorreu um problema", jqXhr.responseText, "error");
        }
    });
}




function geralistaexameimg() {
    $.ajax({
        type: 'GET',
        headers: {
            "Authorization": localStorage.getItem('auth')
        },
        url: urlapp + 'examesimg/listar',
        success: function (data, textStatus, jQxhr) {
            $(".list-group").text("");
            var linhatitulo = $("<a>").text("Exames de Imagem Cadastrados").addClass("list-group-item list-group-item-action active text-white");
            $(".list-group").append(linhatitulo);
            
            $(data).each(function(){
                var linha = $("<a>").attr("id",this.id).text(this.nome).addClass("list-group-item list-group-item-action");
                linha.click(desejaexcluir);
                $(".list-group").append(linha);
            });
        },
        error: function (jqXhr, textStatus, errorThrown) {
            swal("Ocorreu um problema", jqXhr.responseText, "error");
        }
    });
}


function desejaexcluir(event){
    var linha = $(this);
    swal("Deseja realmente excluir esse Exame de imagem?", {
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
                    excluir(linha);
                    break;
            }
        });   
};

function excluir(linha){
    var parametros = {id:linha.attr("id")};
    console.log(parametros);
    parametros = JSON.stringify(parametros);
    $.ajax({
        type: 'POST',
        headers: {
            "Authorization": localStorage.getItem('auth')
        },
        url: urlapp + 'examesimg/remover',
        data: parametros,
        contentType: "application/json",
        success: function (data, textStatus, jQxhr) {
            swal("Exame de Imagem Removido!", "", "success");
            linha.fadeOut(500);
            setTimeout(function() {
                linha.remove();
            }, 500);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            swal("Ocorreu um problema", "Código: "+jqXhr.status+", "+jqXhr.message, "error");
        }
    });
    
}