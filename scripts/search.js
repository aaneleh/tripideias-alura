//FETCH JSON E RENDERIZA OS QUE FOREM RESULTADOS OK
const urlParams = new URLSearchParams(window.location.search);
const busca = urlParams.get('busca')

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