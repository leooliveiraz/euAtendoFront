// armazena o scrolltop do elemento que deseja aguardar
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