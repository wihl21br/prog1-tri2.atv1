import TodoList, { Item } from "./core"

const todoList = new TodoList('todolist.json')
const params = process.argv
const command = params[2]


if (command === "list") {
    const items = await todoList.getItems()
    console.log("items atualmente na lista")

    items.forEach((item, index) => {
        console.log(`${index} : ${item.title}`)
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
console.log("não entrou em if nenhum")
