import TodoList, { Item } from "./core"

const todoList = new TodoList('todolist.json')
const params = process.argv
const command = params[2]

if (command === "list") {
    const items = await todoList.getItems()
    console.log("items atualmente na lista")

    items.forEach((item, index) => {
        console.log(`item ${index+1} no index ${index} : ${item.title}`)
    })
    process.exit(0)
}

if (command === "add") {
    const value = params[3]
    if (!value) {
        console.error("Valor negado")
        process.exit(1)
    }

    
    try{
        await todoList.addItem(new Item(value))}
    catch(error){
        console.error('Erro ao adicionar um item',error)
        process.exit(1)
    }
    console.log("aqui vai a lógica de adicionar: " + value)
    process.exit(0)
}

if (command === "remove") {
    const indexSTR = params[3]
    if (!indexSTR) {
        console.error("Valor negado pois e nulo ou vazio")
        process.exit(1)
    } 
    const index = parseInt(indexSTR)
    if (isNaN(index)) {
        console.error("indice precisa ser um numero: ", indexSTR)
        process.exit(1)
    }
    await todoList.removeItem(index)
    console.log("item removido com sucesso: ", index)
    process.exit(0)
}
if (command === "update") {
    const indexSTR = params[3]
    const valor_novo = params[4]
    if (!indexSTR || !valor_novo) {
        console.error("Valor negado pois e nulo ou vazio")
        process.exit(1)
    }
    const index = parseInt(indexSTR)
    if (isNaN(index)) {
        console.error("indice precisa ser um numero: ", indexSTR)
        process.exit(1)
    }
    if(index < 0){
        console.error("indice precisa ser um numero positivo e que seja conduz o numero da lista: ", index)
        process.exit(1)
    }
    if(!valor_novo){
        console.error("novo valor nao pode ser vazio ou nulo: ", valor_novo)
        process.exit(1)
    }
    await todoList.updateItem(index, new Item(valor_novo))
    console.log("item no index ",index," atualizado com sucesso para: ", valor_novo)
    process.exit(0)


}

if (command)
    console.log(`Comando não reconhecido: ${command}`)

console.log(`Comandos disponíveis:
- add <item>: Adiciona um item à lista
- remove <index>: Remove um item da lista por indice
- list: Mostra os itens atuais da lista
- update <index do item que sera atualizado> <novo valor desse index>: Atualiza um item da lista pelo indice
`)
