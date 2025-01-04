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
    })
}
