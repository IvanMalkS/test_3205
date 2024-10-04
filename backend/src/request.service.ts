import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestService {
    private requestTimeout: NodeJS.Timeout | null = null;

    setRequestTimeout(callback: () => void, delay: number): void {
        if (this.requestTimeout) {
            clearTimeout(this.requestTimeout);
        }
        this.requestTimeout = setTimeout(callback, delay);
    }
}
