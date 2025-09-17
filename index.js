import { input, select } from '@inquirer/prompts';
import CrudAPI from "./CrudAPI.js";

async function listarTodosMaiusculo() {
    const todos = await CrudAPI.lerTodos();

    todos
        .map(pessoa => ({
            id: pessoa.id,
            nome: pessoa.nome.toUpperCase(),
            email: pessoa.email
        }))
        .forEach(pessoa => {
            console.log(`${pessoa.id} - ${pessoa.nome} - ${pessoa.email}`);
        });
}

async function excluirRegistro() {
    let idDigitado;
    while (!idDigitado) {
        const entrada = await input({ message: "Digite o ID da pessoa que deseja excluir:" });
        idDigitado = parseInt(entrada);
        if (isNaN(idDigitado)) {
            console.log("Por favor, digite um número válido.");
            idDigitado = null;
        }
    }

    try {
        const pessoaExcluida = await CrudAPI.excluir(idDigitado);
        console.log("Registro excluído com sucesso:");
        console.log(`ID: ${pessoaExcluida.id}`);
        console.log(`Nome: ${pessoaExcluida.nome}`);
        console.log(`E-mail: ${pessoaExcluida.email}`);
    } catch (erro) {
        console.log(`Erro: ${erro.message}`);
    }
}

async function atualizarRegistro() {
    let idDigitado;
    while (!idDigitado) {
        const entrada = await input({ message: "Digite o ID da pessoa que deseja atualizar:" });
        idDigitado = parseInt(entrada);
        if (isNaN(idDigitado)) {
            console.log("Por favor, digite um número válido.");
            idDigitado = null;
        }
    }

    const pessoaExistente = await CrudAPI.lerPorId(idDigitado);

    if (!pessoaExistente) {
        console.log(`Registro com ID ${idDigitado} não encontrado.`);
        return;
    }

    console.log("Deixe em branco caso não queira alterar o campo.");

    const novoNome = await input({ message: `Novo nome (atual: ${pessoaExistente.nome}):` });
    const novoEmail = await input({ message: `Novo e-mail (atual: ${pessoaExistente.email}):` });

    const dadosAtualizados = {};
    if (novoNome.trim() !== "") dadosAtualizados.nome = novoNome;
    if (novoEmail.trim() !== "") dadosAtualizados.email = novoEmail;

    try {
        const pessoaAtualizada = await CrudAPI.atualizar(idDigitado, dadosAtualizados);
        console.log("Registro atualizado com sucesso:");
        console.log(`ID: ${pessoaAtualizada.id}`);
        console.log(`Nome: ${pessoaAtualizada.nome}`);
        console.log(`E-mail: ${pessoaAtualizada.email}`);
    } catch (erro) {
        console.log("Erro ao atualizar registro:", erro.message);
    }
}

    async function buscarPorId() {
    let idDigitado;
    while (!idDigitado) {
        const entrada = await input({ message: "Digite o ID da pessoa que deseja buscar:" });
        idDigitado = parseInt(entrada);
        if (isNaN(idDigitado)) {
            console.log("Por favor, digite um número válido.");
            idDigitado = null;
        }
    }

    const pessoa = await CrudAPI.lerPorId(idDigitado);

    if (pessoa) {
        console.log(`ID: ${pessoa.id}`);
        console.log(`Nome: ${pessoa.nome}`);
        console.log(`E-mail: ${pessoa.email}`);
    } else {
        console.log(`Registro com ID ${idDigitado} não encontrado.`);
    }
}

function quebraNome(nome){
    let quebra = nome.split(" ")
    if(quebra.length <=1){
        return nome;
    }
    let sobrenome = quebra[quebra.length - 1];
    let nomePrimeiro = quebra[0];
    return sobrenome+", "+ nomePrimeiro;
}

async function listarTodosSobrenome(){
    let todos = await CrudAPI.lerTodos();
    todos.forEach((pessoa) => {
        console.log(quebraNome(pessoa.nome));
    });
}

async function listarTodos(){
    //id - nome - email
    let todos = await CrudAPI.lerTodos();
    todos.forEach((pessoa) => {
        console.log(pessoa.id+ " - " + pessoa.nome + " - " + pessoa.email);
    })
}

async function cadastrarPessoa() {
    let nome;
    let email;

    while(!nome){
        nome = await input({message:"Nome: "})
    }

     while(!email){
        email = await input({message:"Email: "})
    }
    let pessoa =({nome:nome, email:email});
    let cadastrado = await CrudAPI.criar(pessoa);
    console.log("Cadastrado com sucesso! id: "+cadastrado.id);
}

let opcao="";
while(opcao != "sair"){
    opcao = await select({
    message: 'Opção',
    choices: [
        { name: '1 - Cadastrar', value: 'cadastrar'},
        { name: '2 - Listar', value: 'listar'},
        { name: '3 - Buscar por ID', value: 'buscar'},
        { name: '4 - Atualizar registro', value: 'atualizar' },
        { name: '5 - Excluir registro', value: 'excluir' },
        { name: '6 - Colocar nome em maiúscula', value: 'maiuscula' },
        { name: '7 - Exibir sobrenome primeiro', value: 'sobrenome'},
        { name: '8 - Sair', value: 'sair'}
    ]
    });

    switch (opcao) {

        case "cadastrar":
        await cadastrarPessoa();
        break;

        case "listar":
        await listarTodos();
        break;

        case "buscar":
        await buscarPorId();
        break;

        case "atualizar":
        await atualizarRegistro();
        break;

        case "excluir":
        await excluirRegistro();
        break;

        case "maiuscula":
        await listarTodosMaiusculo();
        break;

        case "sobrenome":
        await listarTodosSobrenome();
        break;       
    }
}
console.log(opcao);