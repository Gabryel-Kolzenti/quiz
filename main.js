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
    {
        pergunta: "Qual é a capital do Japão?",
        opcoes: ["Tóquio", "Kyoto", "Osaka", "Nagoya"],
        resposta: "Tóquio",
    },
    {
        pergunta: "Quem foi o primeiro presidente dos Estados Unidos?",
        opcoes: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
        resposta: "George Washington",
    },
    {
        pergunta: "Qual é o maior planeta do sistema solar?",
        opcoes: ["Marte", "Júpiter", "Saturno", "Terra"],
        resposta: "Júpiter",
    },
    {
        pergunta: "Quem escreveu a peça de teatro 'Romeu e Julieta'?",
        opcoes: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Oscar Wilde"],
        resposta: "William Shakespeare",
    },
    {
        pergunta: "Qual é a montanha mais alta do mundo?",
        opcoes: ["Monte Kilimanjaro", "Monte Everest", "Monte Fuji", "Monte Aconcágua"],
        resposta: "Monte Everest",
    },
    {
        pergunta: "Qual é o maior oceano do mundo?",
        opcoes: ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico", "Oceano Ártico"],
        resposta: "Oceano Pacífico",
    },
    {
        pergunta: "Qual é o símbolo químico do ouro?",
        opcoes: ["Au", "Ag", "Fe", "Hg"],
        resposta: "Au",
    },
];

const perguntaElemento = document.getElementById('pergunta');
const opcoesElemento = document.getElementById('opcoes');
const resultadoElemento = document.getElementById('resultado');
const body = document.querySelector('body')
const hiddenPlay = document.querySelector('.comecarJogo');
const valores = document.querySelector('.valores');
const mute = document.querySelector(`.mute button`);

let indicePerguntaAtual = 0;

const buttonPlay = document.querySelector('.comecarJogo button')
buttonPlay.addEventListener('click', () => {
    audioInicial.play();
    hiddenPlay.classList.add('animationComecarJogo');
    carregarPergunta()
    setTimeout(carregaConteudo, 1200);//Carrega a primeira pergunta quando clicar nmo botao iniciar jogo
})

function carregaConteudo(params) {
    const quizContainer = document.querySelector(`main .quiz-container`);
    quizContainer.classList.remove(`preJogo`);
    hiddenPlay.classList.add('preJogo');
    valores.classList.remove('valoresPreJogo');
    valores.classList.add('animationValores');
}

function carregarPergunta(respostaSelecionada) {
    
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

var style = document.createElement('style');

    let progressBar = document.getElementById('progressao');
    let currentPosition = -7; // Inicialmente, a barra está na parte inferior

let verificaCerto = -1;

function moveProgressBar() {
    if (verificaCerto === 1) {
        currentPosition += 10;
        progressBar.style.bottom = currentPosition + '%';
    } else {
        currentPosition -= 10;
        progressBar.style.bottom = currentPosition + '%';
    }

}

const paragrafos = document.querySelectorAll('.valores p');
function adcP(params) {
    if (verificaCerto === 1) {
        const paragrafoGanho = paragrafos[10 - indicePerguntaAtual];
        const paragrafoAnterior = paragrafos[11 - indicePerguntaAtual]
        paragrafoGanho.className = `valorGanho`; 
        paragrafoAnterior.className = `valorAnterior`
        return paragrafoGanho
    } else {
        const paragrafoGanho = paragrafos[(10 - indicePerguntaAtual)];
        const paragrafoPerdido = paragrafos[(9 - indicePerguntaAtual)];
        paragrafoGanho.className = `valorGanho`; 
        paragrafoPerdido.className = `valorAnterior`;
        return paragrafoGanho
    }
} 

function verificaResposta(respostaSelecionada) {
    const perguntaAtual = perguntas [indicePerguntaAtual];
    if (respostaSelecionada === perguntaAtual.resposta) {
        verificaCerto = 1;
        function certa(params) {
            resultadoElemento.textContent = "Resposta Correta!";
            resultadoElemento.className = "correto";
            audioCerto.play();}; 

        setTimeout(adcP, 2250)
        setTimeout(certa, 2000)
        setTimeout(moveProgressBar, 2000);

         } else {
        function errada(params) {
            verificaCerto = 0;
            resultadoElemento.textContent = "Resposta incorreta. A resposta correta é: " + perguntaAtual.resposta;
            resultadoElemento.className = "incorreto";   
            audioErrado.play();
            indicePerguntaAtual --;
            function derrotado(params) {
                perguntaElemento.innerHTML = ``;
                desistir.innerHTML = `Voltar ao inicio`
                desistir.style.pointerEvents = `auto`
                desistir.style.opacity = `1`
                perguntaElemento.className = `valoresPreJogo`;
                opcoesElemento.innerHTML = ``;
                resultadoElemento.innerHTML = `<h2> Não foi dessa vez,  Tente novamente </h2>`;
                resultadoElemento.className = "concluido";
                 

                audioFinal.play();
            }
            setTimeout(derrotado, 1700)
        } 

        setTimeout(adcP, 2250)
        setTimeout(moveProgressBar, 2000);
        setTimeout(errada, 1800)
        
        return
    }
    //Avança para proxima pergunta ou finaliza o quiz
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        setTimeout(carregarPergunta, 4000); //Carrega próxima pergunta após 4 segundos
    } else {
        function vencedor(params) {
            const button = document.querySelector(`.quiz-container button`)
            const a = document.querySelector(`.quiz-container button a`)
            resultadoElemento.textContent = "Parabéns, você agora é um MILIONÁRIO!!";
            resultadoElemento.className = "concluido";
            body.className = 'vencedor'
            perguntaElemento.className = `valoresPreJogo`;
            opcoesElemento.className = `valoresPreJogo`;
            button.className = `valoresPreJogo`;
            a.className = `valoresPreJogo`;
            valores.className = 'valoresPreJogo';
        
            audioVencedor.play();

            audioFinal.play();
        }
        setTimeout(vencedor, 3000)
    }
}
function desabilitarBotoes() {
    const botoes = document.querySelectorAll('.quiz-container button');
    botoes.forEach(botao => {   //querySelectorAll retorna uma NodeList, que não possui a funcao de utilizar a propriedade className. Em vez disso, você precisa lidar com cada elemento da NodeList em especifico, por issod evemos usar forEach
        botao.className = `buttonDisabled`; // Desabilita o botão
    });
}

function habilitarBotoes() {
    const botoes = document.querySelectorAll('.quiz-container button');
    botoes.forEach(botao => {
        botao.className = ``; // Habilita o botão
    });
}

const audioVencedor = new Audio ("audios/silvio-santos-parabens-voce-acaba-de-ganhar-1-milhao-de-reais.mp3")
const audioFinal = new Audio (`audios/abbertura completa.mp3`);
const audioInicial = new Audio ("audios/silvio-santos-abertura-show-do-milhao (mp3cut.net).mp3")
const audioCerto = new Audio ("audios/silvio-santos-certa-resposta.mp3")
const audioErrado = new Audio ("audios/silvio-santos-que-pena-voce-errou.mp3")
audioFinal.volume = 0.15;
audioInicial.volume = 0.11;

mute.addEventListener('click', () => {
    const imgMute = document.querySelector('.mute button img');
    const imagemAtual = imgMute.src;
    const imagemSom = 'img/speaker-filled-audio-tool.png';
    const imagemSemSom = 'img/mute (1).png';

    if (imagemAtual.includes(imagemSom)) {
        imgMute.setAttribute('src', imagemSemSom);
        audioInicial.volume = 0;
        audioCerto.volume = 0;
        audioErrado.volume = 0;
        audioFinal.volume = 0;
        audioVencedor.volume = 0;
        au
    } else {
        imgMute.setAttribute('src', imagemSom);
        audioInicial.volume = 0.11;
        audioCerto.volume = 1;
        audioErrado.volume = 1;
        audioFinal.volume = 0.15;
        audioVencedor.volume = 1;
    }
});

const desistir = document.querySelector(`#desistir`)
desistir.addEventListener('click', () => {
    window.location.reload();
});
