export class Storage {
    static readonly localStorage: number = 0;
    static readonly sessionStorage: number = 1;

    /**
     * current storage
     */
    currentStorage: number;

    /**
     * data key
     * @type {string}
     */
    dataKey: string = '';

    /**
     * data to save
     */
    data: any;

    /**
     * current timestamp
     * @type {number}
     */
    timestamp: number = 0;

    /**
     * time to live the data
     * @type {number}
     */
    ttl: number = 0;

    /**
     * constructor
     */
    constructor() {
        this.initTimestamp();
    }

    /**
     * set to storage
     */
    store() {
        switch (this.currentStorage) {
            case Storage.localStorage:
                Storage.storeLocal(this.dataKey, Storage.getJson({
                    timestamp: this.timestamp,
                    data: this.data,
                }));
                break;
            case Storage.sessionStorage:
                Storage.storeSession(this.dataKey, Storage.getJson({
                    timestamp: this.timestamp,
                    data: this.data,
                }));
                break;
            default:
                throw new Error('Invalid storage identifier');
        }
    }

    /**
     * @returns {any}
     */
    getFromStorage(): any {
        switch (this.currentStorage) {
            case Storage.localStorage:
                const localData = JSON.parse(localStorage.getItem(this.dataKey));
                if (!localData)  {
                    return null;
                }
                if (localData && this.timestamp - localData.timestamp > this.ttl) {
                    localStorage.removeItem(this.dataKey);
                    return null;
                }
                return localData.data;
            case Storage.sessionStorage:
                const sessionData = JSON.parse(sessionStorage.getItem(this.dataKey));
                if (!sessionData)  {
                    return null;
                }
                if (sessionData && this.timestamp - sessionData.timestamp > this.ttl) {
                    sessionStorage.removeItem(this.dataKey);
                    return null;
                }
                return sessionData.data;
            default:
                throw new Error('Invalid storage identifier');
        }
    }

    /**
     * @param {string} key
     * @param {string} data
     */
    private static storeLocal(key: string, data: string): void {
        localStorage.setItem(key, data);
    }

    /**
     * @param {string} key
     * @param {string} data
     */
    private static storeSession(key: string, data: string): void {
        sessionStorage.setItem(key, data);
    }

    /**
     * init timestamp
     */
    private initTimestamp(): void {
        const date = Date.now();
        this.timestamp = Math.floor(date / 1000);
    }

    /**
     * @param data
     * @returns {string}
     */
    private static getJson(data: any) {
        return JSON.stringify(data);
    }
}
