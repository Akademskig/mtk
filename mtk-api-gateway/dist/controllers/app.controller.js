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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const app_service_1 = require("../services/app.service");
const autocompleteQuery_model_1 = require("../models/autocompleteQuery.model");
const parseInt_pipe_1 = require("../pipes/parseInt.pipe");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getPlaces(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentValues;
            try {
                currentValues = this.validateCurrentValues(query.currentValues);
            }
            catch (err) {
                throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
            }
            delete query.currentValues;
            try {
                const r = yield this.appService.getPlaces(query, currentValues);
                return r;
            }
            catch (err) {
                if (err.getResponse) {
                    throw new common_1.HttpException(err.getResponse(), err.getStatus());
                }
                else if (err.response.statusText && err.response.status) {
                    throw new common_1.HttpException(err.response.statusText, err.response.status);
                }
                else {
                    throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
    getPlaceInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const r = yield this.appService.getPlaceInfo(id);
                return r;
            }
            catch (err) {
                if (err.getResponse) {
                    throw new common_1.HttpException(err.getResponse(), err.getStatus());
                }
                else if (err.response.statusText && err.response.status) {
                    throw new common_1.HttpException(err.response.statusText, err.response.status);
                }
                else {
                    throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        });
    }
    root(res) {
        res.status(200);
        res.sendFile('index.html');
    }
    validateCurrentValues(currentValues) {
        if (currentValues.length === 0) {
            return [];
        }
        let arr;
        try {
            arr = currentValues.split(',');
        }
        catch (err) {
            throw new common_1.HttpException('Validation error!', common_1.HttpStatus.BAD_REQUEST);
        }
        const nums = [];
        arr.forEach(element => {
            const val = parseInt(element, 10);
            if (!isNaN(val)) {
                nums.push(val);
            }
            else {
                throw new common_1.HttpException('Validation error!', common_1.HttpStatus.BAD_REQUEST);
            }
        });
        return nums;
    }
};
__decorate([
    common_1.Get('/api/places_autocomplete'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [autocompleteQuery_model_1.AutocompleteQuery]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPlaces", null);
__decorate([
    common_1.Get('/api/place_info/:id'),
    __param(0, common_1.Param('id', new parseInt_pipe_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPlaceInfo", null);
__decorate([
    common_1.Get('/'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "root", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map