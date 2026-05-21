import TodoList, { Item } from "./core"
const todoList = new TodoList('todolist.json')

const params = process.argv
const command = params[2]

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

console.log("não entrou em if nenhum")
