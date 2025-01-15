/**
 * Função para ser usada no event listener de keypress, quando enter for pressionado a busca será realizada
 * @param {event} e valor retornado pelo evento
 * @param {string} value valor que será pesquisado
 */
function enterInput(e, value){
    if(e.code == 'Enter') buscar(value, false, false)
}

/** Função para ser usada no elemento que ativará a busca, como um botão
 *  @param {string} busca o valor que será pesquisado
 *  @param {boolean} promocao irá filtrar os resultados entre os em promocao ou não filtrar
 *  @param {boolean} salvo irá filtrar os resultados entre os salvos ou não filtrar
 */
function buscar(busca, promocao, salvo) {
    if(busca != ''){
        window.location = "/pages/busca.html?busca="+busca+"&promocao="+promocao+"&salvo="+salvo
    } else 
        alert("Preencha seu destino!") //todo modal top
}

/**
 * Cria elementos da lista passada no formato de cards e então adiciona ao elemento pai informado
 * @param {Array} lista lista de objetos com nome, precoAtual, precoNormal
 * @param {Element} parent elemento pai onde serão adicionados os cards
 */
function renderizarCards(lista, parent){

    let pacotesSalvos
    if(localStorage.getItem('salvos') == '' || localStorage.getItem('salvos') == null){
        pacotesSalvos = []
    } else {
        pacotesSalvos = JSON.parse(JSON.stringify(localStorage.getItem('salvos')))
    }

    if(lista.length){
        let card
        let preco
        lista.forEach((el) => {
            card = document.createElement("div")
            card.classList.add('pacote-card')

            if(el.precoAtual < el.precoNormal) {
                preco = `<span class="card-preco-promocao">R$ ${el.precoAtual}</span>
                <span class="card-preco-normal">R$ ${el.precoNormal}</span>
                `
            } else {
                preco = `<span class="card-preco-promocao">R$ ${el.precoAtual}</span>
                `
            }
            card.innerHTML = `
                <div class="img-container">
                    <img src="/assets/${el.imagem}" alt="" />
                    <svg class="bookmark-icon ${pacotesSalvos.includes(el.id) ? "salvos" : ""}" data="${el.id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                    </svg>
                </div>
                <div class="pacote-card-desc">
                    <p class="card-titulo">${el.nome}</p>
                    <p class="card-preco">
                        ${preco}
                    </p>
                    <button class="botao card-botao" onClick=renderizarDialog(${el.id})>Ver Detalhes<button/>
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

/**
 * Cria um dialog, por default como open e append ao body
 * @param {number} pacoteId id do pacote para que seja feito o fetch do nome e descrição
 */
function renderizarDialog(pacoteId){
    let pacote

    fetch("data/pacotes.json")
    .then(res => res.json())
    .then(data => {
        data.forEach((el) => {
            if(el.id == pacoteId) pacote = el
        })

        const dialog = document.createElement('dialog')
        dialog.id = 'detalhes-dialog'
        dialog.innerHTML = `
                <div class="detalhes-voltar">
                    <i class="bi bi-arrow-left-short"></i>
                    <p>Voltar</p>
                </div>
                <h3>${pacote.nome}</h3>
                <div class="detalhes-img">
                    <img src="./assets/Lis1.png" alt="">
                </div>
                <p class="detalhes-descricao">${pacote.descricao}</p>
                <a id="detalhes-dialog-link" href="/pages/detalhes.html?id=${pacoteId}" class="botao">Ver Detalhes</a>
        `
        document.body.appendChild(dialog)
        setTimeout(()=> dialog.open = true, 100)
        const dialogFechar = document.querySelector('#detalhes-dialog .detalhes-voltar')
        dialogFechar.addEventListener('click', () => {
            dialog.close()
            setTimeout(()=> dialog.remove(), 100)
        })
    })
}


function adicionarEventosSalvar() {
    const icones = document.querySelectorAll('.bookmark-icon')
    let id,toggle, pacotesSalvos
    if(localStorage.getItem('salvos') == '' || localStorage.getItem('salvos') == null){
        pacotesSalvos = []
    } else pacotesSalvos = JSON.parse(localStorage.getItem('salvos'))

    icones.forEach((el) => {

        el.addEventListener('click', () => {
            id = el.getAttribute('data')
            //Se salvo, retira dos salvos
            if(pacotesSalvos.includes(id)) {
                toggle = false
                for(let i = 0; i<pacotesSalvos.length; i++)
                    if(pacotesSalvos[i] == id){
                        pacotesSalvos.splice(i, 1)
                        el.classList.remove('salvos')
                        break
                    }
            //Se não salvo, adiciona ao local storage
            } else {
                toggle = true
                pacotesSalvos.push(id)
                el.classList.add('salvos')
            }

            localStorage.setItem('salvos',JSON.stringify(pacotesSalvos))
            console.log(pacotesSalvos)

            //verifica se há outro com o mesmo id pra também modificar o ícone
            icones.forEach((el) => {
                if(el.getAttribute('data') == id){
                    if(toggle) {
                        el.classList.add('salvos')
                    } else el.classList.remove('salvos')
                }
            })

        })
    })
}


//TOGGLE SIDEBAR
const sidebar = document.getElementById('sidebar')
const botaoAbrirSidebar = document.getElementById('abrir-sidebar')
botaoAbrirSidebar.addEventListener('click', () => sidebar.classList.add('aberta')) 

document.body.addEventListener('click', (e) => {
    //fecha sidebar em qualquer click em um elemento que não pertença a ela
    if(e.target.id != 'sidebar'
    && e.target.parentNode.id != 'abrir-sidebar' 
    && e.target.parentNode.parentNode.parentNode.parentNode.id != 'sidebar')
        sidebar.classList.remove('aberta')
})