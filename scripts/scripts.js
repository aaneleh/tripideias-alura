/**
 * Função para ser usada no event listener de keypress, quando enter for pressionado a busca será realizada
 * @param {event} e valor retornado pelo evento
 * @param {string} value valor que será pesquisado
 */
function enterInput(e, value){
    if(e.code == 'Enter') buscar(value)
}
/** Função para ser usada no elemento que ativará a busca, como um botão
 *  @param {string} busca o valor que será pesquisado
 */
function buscar(busca) {
    if(busca != ''){
        window.location = "/pages/busca.html?busca="+busca
    } else 
        alert("Preencha seu destino!") //todo modal top
}

/**
 * Função que cria elementos da lista passada no formato de cards e então adiciona ao elemento pai informado
 * @param {Array} lista lista de objetos com nome, precoAtual, precoNormal
 * @param {Element} parent elemento pai onde serão adicionados os cards
 */
function renderizarCards(lista, parent){
    if(lista.length){
        let card;
        lista.forEach((el) => {
            card = document.createElement("div")
            card.classList.add('pacote-card')
            card.innerHTML = `
                <div class="img-container">
                    <img src="/assets/Lis1.png" alt="" />
                    <svg class="bookmark-icon salvo"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                    </svg>
                </div>
                <div class="pacote-card-desc">
                    <p class="card-titulo">${el.nome}</p>
                    <p class="card-preco">
                        <span class="card-preco-promocao">R$ ${el.precoAtual}</span>
                        <span class="card-preco-normal">R$ ${el.precoNormal}</span>
                    </p>
                    <a href="" class="botao card-botao">Ver Detalhes</a>
                </div>
            `
            parent.appendChild(card)
        })
    } else {
        const mensagemErro = document.createElement("p")
        mensagemErro.innerText = "Nenhum pacote encontrado"
        parent.appendChild(mensagemErro)
    }
}

//TOGGLE SIDEBAR
const sidebar = document.getElementById('sidebar')
const botaoAbrirSidebar = document.getElementById('abrir-sidebar')
botaoAbrirSidebar.addEventListener('click', () => sidebar.classList.add('aberta')) 

//fecha sidebar em qualquer click em um elemento que não pertença a ela
document.body.addEventListener('click', (e) => {
    if(e.target.id != 'sidebar'
    && e.target.parentNode.id != 'abrir-sidebar' 
    && e.target.parentNode.parentNode.parentNode.parentNode.id != 'sidebar')
        sidebar.classList.remove('aberta')
})