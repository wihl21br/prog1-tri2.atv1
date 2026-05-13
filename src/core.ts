class item {
    constructor(public tittle: string) { }
}
class TodoList {
    private items: Item[] = [];
    private filePath: string;
    constructor(filePath: string) {
        this.filePath = filePath;
    }
    addItem(item: Item) {
        this.items.push(item);
    }
    removeItems(index: number) {
        this.items.splice(index, 1);
    }
    getItems(): Item[] {
        return [...this.items];
    }
}
