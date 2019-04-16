"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Places {
    constructor(data) {
        this.data = data;
    }
}
exports.Places = Places;
class PlaceItem {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.PlaceItem = PlaceItem;
class PlaceInfo {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.about = 'something about the place';
    }
}
exports.PlaceInfo = PlaceInfo;
//# sourceMappingURL=places.model.js.map