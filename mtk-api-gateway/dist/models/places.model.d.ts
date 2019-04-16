export declare class Places {
    paging: any;
    data: PlaceItem[];
    constructor(data: PlaceItem[]);
}
export declare class PlaceItem {
    id: number;
    name: string;
    constructor(id: any, name: any);
}
export declare class PlaceInfo {
    id: number;
    name: string;
    about: string;
    cover: {
        id: number;
        cover_id: number;
        offset_y: number;
        offset_x: number;
        source: string;
    };
    constructor(id: number, name: string);
}
