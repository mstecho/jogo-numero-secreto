//Criação de listas e constantes
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;//inicialização da variável que verifica a quantidade de tentativas

//Função responsável por exibir o texto e fala do jogo
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);//Pegando a tag responsável
    campo.innerHTML = texto;//adicionando o texto à tag selecionada
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //configuração da fala, que vai ler o textop
}

//Função criada para exibir texto inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');//Adicionando texto na tag h1 responsável pelo título
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');//Adicionando texto a tag p responsável pelo parágrafo
}

exibirMensagemInicial();//fazendo a chamada da função de exibir o texto inicial
//Função que verifica os chutes e tentativas de acerto do jogo
function verificarChute() {
    let chute = document.querySelector('input').value;//pegando o valor inserido pelo usuário
    
    if (chute == numeroSecreto) { //realizando o teste para saber se o usuário acertou o número escolhido
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');//habilitando o botão novo jogo
    } else {
        if (chute > numeroSecreto) { //fazendo as comparações e forncendo dicas se o número sorteado é maior ou menor que o informado pelo usuário
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; //adiciona o número de tentativas que o usuário fez
        limparCampo();//limpa o campo aonde o usuário inseri os valores 
    }
}
//Função responsável por sortear o número
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);//sorteio do número aleatório usando a função random do JS 
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;//pegando o tamanho da lista de número sorteados

    if (quantidadeDeElementosNaLista == numeroLimite) { //verificando se a lista atingiu o limite de números
        listaDeNumerosSorteados = [];//zerando a lista onde são armazenados os números sorteados
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //condicional que compara se o número já foi sorteado checando dentro da lista armazenada
        return gerarNumeroAleatorio();//caso o número já tenha sido sorteado, invoca a função para sortear um novo. Recursividade
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);//adiciona o número escolhido ao final da lista
        console.log(listaDeNumerosSorteados)//exibe a lista no console
        return numeroEscolhido;//retorna o númeor escolhido
    }
}
//função responsável por limpar o campo input onde o usuário informa os valores
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
//Função responsável por reiniciar o jogo ao atingir os 10 números escolhidos
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}







