class ExtensionRuntime {
    private browser: typeof chrome | typeof browser;

    constructor() {
        this.browser = this.getBrowser();        
    }
    
    public setSettings(values: {[key: string]: any}): void {
        this.browser.storage.local.set(values);
    }

    public getSettings(keys: string[]): Promise<{[index: string]: any}> {
        const callback = (resolve: (v: any) => void, values: {[index: string]: any}) => {
            resolve(values);
        };

        const promise = new Promise<{[index: string]: any}>((resolve) => {
            this.browser.storage.local.get(keys).then((values: {[index: string]: any}) => callback(resolve, values));
        });

        return promise;        
    }

    public getAllSettings(): Promise<{[index: string]: any}> {
        const callback = (resolve: (v: any) => void, values: {[index: string]: any}) => {
            resolve(values);
        };

        const promise = new Promise<{[index: string]: any}>((resolve) => {
            this.browser.storage.local.get().then((values: {[index: string]: any}) => callback(resolve, values));
        });

        return promise;        
    }

    public onChanged(callback: (v: {[key: string]: {oldValue?: any, newValue?: any}}) => void): void {
        this.browser.storage.local.onChanged.addListener(callback);
    }

    private getBrowser() {
        return (chrome ?? browser);
    }
}

const extensionRuntime = new ExtensionRuntime();