const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: ["São Paulo", "Brasília", "Rio de Janeiro", "Belo Horizonte"],
        resposta: "Brasília"
    },

    {
        pergunta: "Quantos planetas existem em nosso sistema solar?",
        opcoes: ["6", "7", "8", "9"],
        resposta: "8",
    },

    {
        pergunta: "Quem escreveu 'Dom Quixote'?",
        opcoes: ["William Shakespeare", "Miguel de Cervantes", "Friedrich Nietzsche", "Charles Dickens"],
        resposta: "Miguel de Cervantes",
    },
];

const perguntaElemento = document.getElementById('pergunta');
const opcoesElemento = document.getElementById('opcoes');
const resultadoElemento = document.getElementById('resultado');
const body = document.querySelector('body')
const hiddenPlay = document.querySelector('.comecarJogo');

let indicePerguntaAtual = 0;

const buttonPlay = document.querySelector('.comecarJogo button')
buttonPlay.addEventListener('click', () => {
    const audioInicial = new Audio ("audios/silvio-santos-abertura-show-do-milhao (mp3cut.net).mp3")
    audioInicial.play();
    setTimeout(carregarPergunta, 1400);//Carrega a primeira pergunta quando clicar nmo botao iniciar jogo
})

function carregarPergunta(respostaSelecionada) {
    desabilitarBotoes(); // Desabilita os botões antes de carregar a próxima pergunta
    hiddenPlay.classList.add('desativado')
    const perguntaAtual = perguntas[indicePerguntaAtual];
    perguntaElemento.textContent = perguntaAtual.pergunta;

    opcoesElemento.innerHTML = "";
    perguntaAtual.opcoes.forEach(opcao => {
        const botao = document.createElement('button');
        botao.textContent = opcao;
        botao.addEventListener("click", () => {
            verificaResposta(opcao);
            desabilitarBotoes(); // Desabilita os botões quando um botão de opção é clicado
        });
        opcoesElemento.appendChild(botao);
        resultadoElemento.textContent = "";
        resultadoElemento.className = ""; 
    });

    resultadoElemento.textContent = ""; //para apagar a mensagem que aparece embaixo apos selecionar uma resposta
    resultadoElemento.className = ""; 

    habilitarBotoes(); // Habilita os botões após criar as opções de resposta
}


function verificaResposta(respostaSelecionada) {
    const perguntaAtual = perguntas [indicePerguntaAtual];
    if (respostaSelecionada === perguntaAtual.resposta) {
        function certa(params) {
            resultadoElemento.textContent = "Resposta Correta!";
            resultadoElemento.className = "correto";
            const audioCerto = new Audio ("audios/silvio-santos-certa-resposta.mp3")
            audioCerto.play();
        }
        setTimeout(certa, 2000)
    } else {
        function errada(params) {
            resultadoElemento.textContent = "Resposta incorreta. A resposta correta é: " + perguntaAtual.resposta;
            resultadoElemento.className = "incorreto";   
            const audioErrado = new Audio ("audios/silvio-santos-que-pena-voce-errou.mp3")
            audioErrado.play();
        }
        setTimeout(errada, 1800)
    }
    //Avança para proxima pergunta ou finaliza o quiz
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        setTimeout(carregarPergunta, 4000); //Carrega próxima pergunta após 4 segundos
    } else {
        function concluido(params) {
            resultadoElemento.textContent = "Parabéns, você agora é um MILIONÁRIO!!";
            resultadoElemento.className = "concluido";
            body.className = 'vencedor'
            const audioVencedor = new Audio ("audios/silvio-santos-parabens-voce-acaba-de-ganhar-1-milhao-de-reais.mp3")
            audioVencedor.play();
            const audioFinal = new Audio (`audios/abbertura completa.mp3`)
            audioFinal.volume = 0.25;
            audioFinal.play();
        }
        setTimeout(concluido, 4000)
    }
}

function desabilitarBotoes() {
    const botoes = document.querySelectorAll('#opcoes button');
    botoes.forEach(botao => {   //querySelectorAll retorna uma NodeList, que não possui a funcao de utilizar a propriedade className. Em vez disso, você precisa lidar com cada elemento da NodeList em especifico, por issod evemos usar forEach
        botao.className = `desabilitado`; // Desabilita o botão
    });
}

function habilitarBotoes() {
    const botoes = document.querySelectorAll('#opcoes button');
    botoes.forEach(botao => {
        botao.className = ``; // Habilita o botão
    });
}
