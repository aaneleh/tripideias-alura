//FETCH JSON E RENDERIZA OS QUE FOREM RESULTADOS OK
const urlParams = new URLSearchParams(window.location.search);
const busca = urlParams.get('busca')
const checkPromocao = urlParams.get('promocao')=='true'
const checkSalvo = urlParams.get('salvo') =='true'

const buscaAtualSpan = document.getElementById('busca-atual')
const inputCheckPromocao = document.getElementById('check-promocao')
const inputCheckSalvo = document.getElementById('check-salvos')

buscaAtualSpan.innerText = busca
inputCheckPromocao.checked = checkPromocao
inputCheckSalvo.checked = checkSalvo

window.onload = function carregarPacotes() {
    let pacotesSalvos
    if(localStorage.getItem('salvos') == '' || localStorage.getItem('salvos') == null){
        pacotesSalvos = []
    } else pacotesSalvos = JSON.parse(JSON.stringify(localStorage.getItem('salvos')))

    fetch("../data/pacotes.json")
    .then(res => res.json())
    .then(data => {
        let resultados = []
        data.forEach((el) => {
            if((el.nome.toUpperCase().includes(busca.toUpperCase()) || busca == '') &&
            (!checkPromocao || el.precoAtual < el.precoNormal)  &&
            (!checkSalvo || pacotesSalvos.includes(el.id)) ){
                resultados.push(el)
            }
        })
        renderizarCards(resultados, document.getElementById('resultados'))
        adicionarEventosSalvar()
    })
}

//EVENT LISTENERS NOVA PESQUISA
const inputNovaPesquisa = document.getElementById('input-pesquisar-nova-pesquisa')
inputNovaPesquisa.addEventListener('keypress', (e) => enterInput(e, inputNovaPesquisa.value))

const botaoNovaPesquisa = document.getElementById('botao-pesquisar-nova-pesquisa')
botaoNovaPesquisa.addEventListener('click', () => buscar(inputNovaPesquisa.value))

//TOGGLE FILTROS
const filtroEl = document.getElementById('filtro')
const botaoFiltro = document.getElementById('botao-filtro')
botaoFiltro.addEventListener('click', ()=> filtroEl.classList.toggle('active'))

//EVENT LISTENERS FILTROS
function buscaComFiltros(){
    buscar(
        inputNovaPesquisa.value != '' ? inputNovaPesquisa.value : busca,
        inputCheckPromocao.checked,
        inputCheckSalvo.checked
    )
}
inputCheckPromocao.addEventListener('change', () => buscaComFiltros())
inputCheckSalvo.addEventListener('change', () => buscaComFiltros())
