///
/**
 * @todo
 * known issues:
 * - getItems needs to await loadListFromDisk()
 */


class Item {
  constructor(public title: string) { }
}
class TodoList {
  private items: Promise<Item[]>
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.items = this.readListFromDisk()
  }
  
  private async saveListToDisk(){
    const file = Bun.file(this.filePath)
    const data = JSON.stringify(await this.items)
    await file.write(data)
  }
/**
 * Adiciona um novo item
 */
  
private async readListFromDisk(){
    const file = Bun.file(this.filePath)
    const data = await file.json()
    const items: Item[]  = data.map((v:any)=>{
        return new Item(v.tittle)
    })
    return items;
}
  async addItem(item: Item) {
    const items = await this.items
    if(!item)
      throw 'Item nao pode ser nulo ou indefinido'
    if(!item.title.trim()|| !item.title)
      throw 'Item title nao pode ser nulo ou indefinido'
    items.push(item)
    await this.saveListToDisk()
  }
/**
 *Remove um item especifico 
 */
async removeItem(index: number) {
    const items = await this.items
    items.splice(index, 1);
    await this.saveListToDisk()
  }
/**
 * Returna uma copia da lista de itens
 */
async update(index:number, newItem: Item) {
  const items = await this.items
  items[index] = newItem
  await this.saveListToDisk()
}
  async getItems() {
    const items = await this.items
    return Array.from(items)
  }
}

const lista = new TodoList('arquivo.json')

export default TodoList;
export {Item, TodoList}
