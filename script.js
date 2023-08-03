//Algoritmo

// CALCULARIDADE
// 1. Pegar os valores;
// 2. Calcular a idade;
// 3. Gerar a faixa etária;
// 4. Organizar o objeto pessoa para salvar na lista;
// 5. Função para carregar as pessoas, carregar a lista do localStorage,chamar ao carregar a página;
// 6. Renderizar o conteúdo da tabela com as pessoas cadastradas;
// 7. Renderizar o conteúdo no html;
// 8. Botão de limpar os registros.


//Função principal
function calcularIdade(event) {
    event.preventDefault()

    console.log("Funciona");

    let dadosUsuario = pegarValores();

    let idade = calcular(dadosUsuario.diaNascimento, dadosUsuario.mesNascimento, dadosUsuario.anoNascimento);

    let classificar = classificarIdade(idade);

    console.log(classificar);

    let dadosAtualizado = organizarDados(dadosUsuario, idade, classificar);
    console.log(dadosAtualizado);

    cadastrarUsuario(dadosAtualizado);
}

//Passo 1 - Pegar valor
function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let diaRecebido = parseFloat(document.getElementById("dia-nascimento").value);
    let mesRecebido = parseFloat(document.getElementById("mes-nascimento").value);
    let dataRecebida = parseFloat(document.getElementById("ano-nascimento").value);


    let dadosUsuario = {
        nome: nomeRecebido,
        diaNascimento: diaRecebido,
        mesNascimento: mesRecebido,
        anoNascimento: dataRecebida,

    }

    console.log(dadosUsuario);

    return dadosUsuario;
}

//Passo 2 - Calcular a idade;
function calcular(diaNascimento, mesNascimento,anoNascimento) {
    let dataAtual = new Date();
    let idade = (dataAtual.getFullYear()) - anoNascimento;

    if (mesNascimento > dataAtual.getMonth()) {
        idade --
    }

    if (mesNascimento > dataAtual.getDay()) {
        mesNascimento --

    }else {

    }

    console.log(idade);

    return idade;
}

//Passo 3 - Gerar a faixa etária;
function classificarIdade(idade) {

    if (idade <= 12) {
        return "Criança";

    } else if (idade < 17) {
        return "Adolescente";

    } else if (idade < 65) {
        return "Adulto";

    } else {
        return "Idoso";
    }

}

//Passo 4 - Organizar dados
function organizarDados(dadosUsuario, idade, classificarIdade) {
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        classificacao: classificarIdade,
        dataCadastro: dataHoraAtual,
        idade: idade
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;

}

//Passo 5 - Função para carregar as pessoas, carregar a lista do localStorage,chamar ao carregar a página;
function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))

}

//Passo 6 - Renderizar tabela com conteudo
function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.lenght == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="Linha-mensagem">
        <td colspan="4">Nenhum usuario cadastrado!</td>
        </tr>`
    } else {
        montarTabela(listaUsuarios);
    }

}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

//Passo 7 - Montar tabela
function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';
     console.log(listaDeCadastrados);

    listaDeCadastrados.forEach(pessoa => {
        template += `<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="data de nascimento">${pessoa.diaNascimento}/${pessoa.mesNascimento}/${pessoa.anoNascimento}</td>
        <td data-cell="idade">${pessoa.idade}</td>
        <td data-cell="faixa etária">${pessoa.classificacao}</td>
        </tr>`

    });
    console.log(listaDeCadastrados);

    tabela.innerHTML = template;
}

//Passo 8 - Limpar local storage
function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")
    window.location.reload();
}