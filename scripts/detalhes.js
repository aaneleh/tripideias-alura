//FETCH JSON E RENDERIZA OS QUE FOREM RESULTADOS OK
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')
const nomeEl = document.getElementById('detalhes-nome')
const descricaoEl = document.getElementById('detalhes-descricao')

window.onload = function carregarPacote() {
    fetch("../data/pacotes.json")
    .then(res => res.json())
    .then(data => {
        let pacote
        data.forEach((el) => {
            if(el.id = id) pacote = el
        })

        nomeEl.innerText = pacote.nome
        descricaoEl.innerText = pacote.descricao

    })
}