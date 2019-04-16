"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    getPlaces(query, currentValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.httpService.get('http://127.0.0.1:3001/api/places_autocomplete', {
                params: {
                    query: query.query,
                    type: query.type,
                    currentValues,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }).toPromise().then(r => r.data).catch(err => { common_1.Logger.error(err.message, err.stack, 'AppService - getPlaces', true); throw err; });
        });
    }
    getPlaceInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.httpService.get(`http://127.0.0.1:3001/api/place_info/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).toPromise().then(r => r.data).catch(err => { common_1.Logger.error(err.message, err.stack, 'ApiService - getPlaceInfo', true); throw err; });
        });
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map