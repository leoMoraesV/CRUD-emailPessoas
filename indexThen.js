
const perguntar = input({ message: 'Nome: ' });

function retornarQuandoResponder(nome){
    const perguntar2 = input({ message: 'Idade: ' });
    function retornarQuandoResponderIdade(nome){
    console.log("Olá : " + nome + ", vc tem " + idade + "anos!");       
    }
    perguntar2.then(retornarQuandoResponderIdade);
}

console.log("Chegou aqui");
//console.log(answer);