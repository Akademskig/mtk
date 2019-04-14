
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

// tslint:disable-next-line:max-classes-per-file
export class PlaceInfo {
    id: number;
    name: string;
    about: string;
    cover: {
        id: number
        cover_id: number
        offset_y: number
        offset_x: number
        source: string,
    };

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.about = 'something about the place';
    }
}
