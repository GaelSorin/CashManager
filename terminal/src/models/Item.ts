export class Item {
    id: string;
    name: string;
    price: number;
    image: string;
    id_establishment: string;

    constructor(
        id: string,
        name: string,
        price: number,
        image: string,
        id_establishment: string
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.id_establishment = id_establishment;
    }
}

export class ItemListWithQuantity {
    item: Item;
    quantity: number;
    
    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}