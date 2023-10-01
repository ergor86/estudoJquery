var umaPropraganda = function(){
    var propagandas = ["Quer comprar uma moto?",
                        "Quer comprarr uma lancha?",
                        "Quer comprar uma bicicleta?",
                        "Quer comprar um carro?"
                    ];
    var posicao = Math.floor(propagandas.length * Math.random());//gera um número aleatório entre as 4 posições
    var texto = propagandas[posicao];
    var tr = $("<tr>").addClass("propaganda").append($("<td>"));
    tr.find("td").attr("colspan",6).text(texto); //amplia para 6 colunas de espaço


    return tr;
}

var daDestaque = function(){
    $(this).css("background", "#ccc");
}
var tiraDestaque = function(){
    $(this).css("background", "");
}

var aposInicializado = function(){
    atualizaDados();
    $(".undo").click(undo);
    $(".remove-item").click(removeItem);
    
    $(".carrinho").each(function(){
        $(this).find("tr:nth-child(3n)").each(function(){ //a cada terceira linha percorrida da tabela do carrinho da iteração
            umaPropraganda().insertAfter($(this));
        });
    });
    $(".carrinho tbody tr").hover(daDestaque, tiraDestaque);
    $("#esconde-propagandas").click(esconderPropagandas);
    $("#mostra-propagandas").click(mostrarPropagandas);

}

var esconderPropagandas = function(event){
    event.preventDefault();
    $(".propaganda").fadeOut();
}

var mostrarPropagandas = function(event){
    event.preventDefault();
    $(".propaganda").fadeIn();
}

var removeItem = function(event){
    event.preventDefault();
    var self = $(this);
    self.closest("tr").hide();
    atualizaDados();
}

var atualizaDados = function(){
    var carrinhos = $(".carrinho");
    carrinhos.each(function(){
        var carrinho = $(this);
        var items = carrinho.find(".item-total:visible");
        var total =0;
        for(var i=0;i<items.length;i++){
            var conteudo = $(items[i]).text();
            var preco = parseFloat(conteudo);
            total += preco;
        }
        carrinho.find(".valor-total").text(total);
        carrinho.find(".quantidade-de-itens").text(items.length);
    });
    
    
    
}

var undo = function(){
    var carrinho = $(this).closest('.carrinho');
    carrinho.find("tr:visible").removeClass("recuperado");
    var trs = carrinho.find("tr:hidden");
    trs.addClass("recuperado");
    trs.show();
    atualizaDados();
}

$(aposInicializado);
