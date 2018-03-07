$("#botaologar").click(function(event){
    event.preventDefault();
    realizalogin();
});

function realizalogin(){    
    var dados = formToJSON("#login");
    var parametros = JSON.stringify(dados); 
    console.log(dados.username);
    $.ajax({
        type: 'POST',
        url: urlapp+'login',
        contentType: "application/json",
        data: parametros,
        success: function(data, textStatus, jQxhr) {
            $("#username").removeClass("is-invalid");
            $("#password").removeClass("is-invalid");
            localStorage.setItem('auth',data);
            localStorage.setItem('user',dados.username);
            localStorage.setItem('password',dados.password);
            $(location).attr('href', '../estabelecimento/painel.html');
        },
        error: function(jqXhr, textStatus, errorThrown) {
            $("#username").addClass("is-invalid");
            $("#password").addClass("is-invalid");
            $("#alert").removeClass("invisible");
            swal("Login Inválido","Informe o email e senha corretos","error");
        }
    }); 
}