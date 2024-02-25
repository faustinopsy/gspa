import LocalStorageService from '../libs/LocalStorageService.js';
import FetchData from '../api/FetchData.js';

class I18nService {
    constructor() {
        this.language = LocalStorageService.getItem('language') || 'en';
        this.translations = {};
    }

    async loadTranslations() {
        const path = `assets/i18n/${this.language}.json`; 
        const fetchData = new FetchData(path);
        try {
            this.translations = await fetchData.getData();
        } catch (error) {
            console.error("Could not load language file:", error);
            this.translations = {};
        }
    }

    t(key) {
        return this.translations[key] || key;
    }
}
export default I18nService;