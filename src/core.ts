class Item {
  constructor(public item: string) { }
}
class TodoList {
  private items: Item[] = [];
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }
  
  private async saveListToDisk(){
    const file = Bun.file(this.filePath)
    const data = JSON.stringify(this.items)
    await file.write(data)
  }
/**
 * Adiciona um novo item
 */
  
private async readListFromDisk(){
    const file = Bun.file(this.filePath)
    const data = await file.json()
    this.items = data.map((v:any)=>{
        return new Item(v.tittle)
    })
}
  async addItem(item: Item) {
    this.items.push(item)
    await this.saveListToDisk()
  }
/**
 *Remove um item especifico 
 */
async removeItem(index: number) {
    this.items.splice(index, 1);
    await this.saveListToDisk()
  }
/**
 * Returna uma copia da lista de itens
 */
  async getItems() {
    return Array.from(this.items)
  }
}
const lista = new TodoList('arquivo.json')
