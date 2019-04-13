import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class DecodeURIPipe implements PipeTransform<string, number[]> {
    // tslint:disable-next-line:no-empty
    constructor() {}
    transform(value: string, metadata: ArgumentMetadata): number[] | null {
        const val = decodeURI(value);
        const valArr = val.split(',');
        const valNum = [];

        if (Array.isArray(valArr)) {
            valArr.map(v => {
                const n = parseInt(v, 10);
                Logger.log(n);
                if (isNaN(n)) {
                    throw new BadRequestException('Validation failed');
                } else {
                    valNum.push(n);
                }
            });
            Logger.log('pipe');
            return valNum;
        }
    }
}
