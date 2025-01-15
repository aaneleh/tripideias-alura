
//INPUTS DE BUSCA HERO E CALLTOACTION
const inputHero = document.getElementById('input-pesquisar-hero')
inputHero.addEventListener('keypress', (e) => enterInput(e, inputHero.value))

const botaoHero = document.getElementById('botao-pesquisar-hero')
botaoHero.addEventListener('click', () => buscar(inputHero.value,false,false))

const inputCall = document.getElementById('input-pesquisar-calltoaction')
inputCall.addEventListener('keypress', (e) => enterInput(e, inputCall.value))

const botaoCall = document.getElementById('botao-pesquisar-calltoaction')
botaoCall.addEventListener('click', () => buscar(inputCall.value,false,false))

//BOTAO VOLTAR PRO TOPO DA PÁGINA
const botaoVoltar = document.getElementById('voltar-topo')
botaoVoltar.addEventListener('click', () => document.getElementById("hero").scrollIntoView())
window.addEventListener('scroll', () => window.scrollY > 1500 ? botaoVoltar.classList.add('visivel') : botaoVoltar.classList.remove('visivel'))

//FETCH JSON E ADICIONA CARDS PACOTES NA PAGINA INICIAL
window.onload = function carregarPacotes() {
    fetch("data/pacotes.json")
    .then(res => res.json())
    .then(data => {
        let promocoes = []
        let populares = []
        data.forEach((el) => {
            if(el.precoAtual != el.precoNormal) promocoes.push(el)
               populares.push(el)
        })
        renderizarCards(promocoes, document.getElementById('promocoes'))
        renderizarCards(populares, document.getElementById('populares'))
        adicionarEventosSalvar()
    })
}
