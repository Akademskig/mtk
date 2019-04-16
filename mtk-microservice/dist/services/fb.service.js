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
let FbService = class FbService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    fbLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.httpService.get('https://graph.facebook.com/oauth/access_token?', {
                params: {
                    client_id: '859178397757750',
                    client_secret: '3a65dc47a092fd2b8a591047de7595ac',
                    grant_type: 'client_credentials',
                },
            }).toPromise().then(r => {
                this.accessToken = r.data.access_token;
                this.tokenType = r.data.type;
            });
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accessToken) {
                return this.accessToken;
            }
            else {
                yield this.fbLogin();
                return this.accessToken;
            }
        });
    }
    getPlaces(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken) {
                try {
                    yield this.getToken();
                }
                catch (err) {
                    common_1.Logger.error(err.message, err.stack, 'Fb Service - get token', true);
                    throw err;
                }
            }
            return this.httpService.get('https://graph.facebook.com/v3.2/search?', {
                params: {
                    access_token: this.accessToken,
                    type: 'place',
                    q: query,
                },
            }).toPromise().then(r => r.data).catch(err => {
                common_1.Logger.error(err.message, err.stack, 'Fb Service - get places', true);
                throw err;
            });
        });
    }
    getPlaceInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.accessToken) {
                try {
                    yield this.getToken();
                }
                catch (err) {
                    common_1.Logger.error(err.message, err.stack, 'Fb Service - get token', true);
                    throw err;
                }
            }
            return this.httpService.get(`https://graph.facebook.com/v3.2/${id}?`, {
                params: {
                    fields: 'name, about, cover',
                    access_token: this.accessToken,
                },
            }).toPromise().then(r => r.data).catch(err => {
                common_1.Logger.error(err.message, err.stack, 'Fb Service - get place info', true);
                throw err;
            });
        });
    }
};
FbService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], FbService);
exports.FbService = FbService;
//# sourceMappingURL=fb.service.js.map