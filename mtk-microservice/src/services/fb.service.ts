import { Injectable, Logger, HttpService } from '@nestjs/common';

@Injectable()
export class FbService {
    accessToken: string;
    tokenType: string;
    constructor(private readonly httpService: HttpService) {}

    async fbLogin() {
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
    }
    async getToken(): Promise<any> {
        if (this.accessToken) {
            return this.accessToken;
        } else {
            await this.fbLogin();
            return this.accessToken;
        }
    }
    async getPlaces(query: string): Promise<any> {
        if (!this.accessToken) {
            try {
                await this.getToken();

            } catch (err) {
                Logger.error(err.message, err.stack, 'Fb Service - get token', true); throw err;
            }
        }
        return this.httpService.get('https://graph.facebook.com/v3.2/search?', {
            params: {
                access_token: this.accessToken,
                type: 'place',
                q: query,
            },
        }).toPromise().then(r => r.data).catch(err => {
            Logger.error(err.message, err.stack, 'Fb Service - get places', true); throw err;
        });

    }
    async getPlaceInfo(id: number): Promise<any> {
        if (!this.accessToken) {
            try {
                await this.getToken();

            } catch (err) {
                Logger.error(err.message, err.stack, 'Fb Service - get token', true); throw err;
            }
        }
        return this.httpService.get(`https://graph.facebook.com/v3.2/${id}?`, {
            params: {
                fields: 'name, about, cover',
                access_token: this.accessToken,
            },
        }).toPromise().then(r => r.data).catch(err => {
            Logger.error(err.message, err.stack, 'Fb Service - get place info', true); throw err;
        });

    }
}
