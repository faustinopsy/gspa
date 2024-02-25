class LocalStorageService {
    static setItem(key, value) {
        const valueToStore = JSON.stringify(value);
        window.localStorage.setItem(key, valueToStore);
    }

    static getItem(key) {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    static removeItem(key) {
        window.localStorage.removeItem(key);
    }
}
export default LocalStorageService;