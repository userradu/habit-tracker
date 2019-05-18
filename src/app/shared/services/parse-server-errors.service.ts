import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ParseServerErrorsService {

    constructor() {}

    parseError(serverResponse: any) {
        let result = "";
        
        if (Array.isArray(serverResponse.error)) {
            for (let i = 0; i < serverResponse.error.length; i++) {
                result += serverResponse.error[i] + " ";
            }
        }
        else {
            result = serverResponse.error;
        }

        return result;
    }
}