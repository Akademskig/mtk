
export class Places {
    paging: any;
    data: PlaceItem[];

    constructor(data: PlaceItem[]) {
        this.data = data;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class PlaceItem {
    id: number;
    name: string;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
