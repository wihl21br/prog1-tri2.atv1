const containerAdicionar = document.querySelector('.adicionar')
const btnAdicionar = document.querySelector("button")
const inputAdicionar = document.querySelector("input")
const containertarefas = document.querySelector(".tarefas")
const tarefasTemplates = containertarefas.querySelector("template")

function salvartarefas () {
    const NodeListTarefas = containertarefas.querySelectorAll(':scope > .tarefa span')
    const arraytarefa = Array.from(NodeListTarefas).map(e1 => e1.textContent.trim());
    const stringTarefas = JSON.stringify(arraytarefa)
    localStorage.setItem("tarefas", stringTarefas)
}
function carregarTarefas() {
    const stringTarefas = localStorage.getItem('tarefas')
    const arraytarefa = JSON.parse(stringTarefas)  || []
    arraytarefa.forEach(e1text => criarTarefa(e1text))
}


function criarTarefa(texto){
    if (texto.trim()=="")return
    const tarefa = tarefasTemplates.content.cloneNode(true)
    const btnexcluir = tarefa.querySelector("button")
    const span = tarefa.querySelector("span")
    
    
    btnexcluir.addEventListener("click", () => {
        btnexcluir.closest(".tarefa").remove()
        salvartarefas();
    })

    span.textContent = texto 
    containertarefas.appendChild(tarefa)
    salvartarefas()
}


btnAdicionar.addEventListener ("click", () => {
    const texto = inputAdicionar.value.trim();
    criarTarefa(texto)
    inputAdicionar.value = ""
})


inputAdicionar.addEventListener("keypress",(evt)=>{
    if(evt.key !== 'Enter') return
    btnAdicionar.click()
})
carregarTarefas()