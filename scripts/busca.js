//FETCH JSON E RENDERIZA OS QUE FOREM RESULTADOS OK
const urlParams = new URLSearchParams(window.location.search);
const busca = urlParams.get('busca')
const buscaAtualSpan = document.getElementById('busca-atual')
buscaAtualSpan.innerText = busca

window.onload = function carregarPacotes() {
    fetch("../data/pacotes.json")
    .then(res => res.json())
    .then(data => {
        let resultados = []
        data.forEach((el) => {
            if(el.nome.toUpperCase().includes(busca.toUpperCase())) {
                resultados.push(el)
            }
        })
        renderizarCards(resultados, document.getElementById('resultados'))
    })
}

//EVENT LISTENERS NOVA PESQUISA
const inputNovaPesquisa = document.getElementById('input-pesquisar-nova-pesquisa')
inputNovaPesquisa.addEventListener('keypress', (e) => enterInput(e, inputNovaPesquisa.value))

const botaoNovaPesquisa = document.getElementById('botao-pesquisar-nova-pesquisa')
botaoNovaPesquisa.addEventListener('click', () => buscar(inputNovaPesquisa.value))