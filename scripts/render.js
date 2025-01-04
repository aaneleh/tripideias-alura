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
