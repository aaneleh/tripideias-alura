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