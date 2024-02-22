class FetchData {
    constructor(url) {
        this.url = url;
    }

    async getData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error('Erro ao obter os dados');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao obter os dados:', error);
            return [];
        }
    }
}

export default FetchData;
