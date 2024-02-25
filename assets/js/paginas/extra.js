import Card from '../componentes/card.js';
import FetchData from '../api/FetchData.js';
class Extra {
    constructor() {
        this.i18nService = null;
    }
    render(i18nService) {
        this.i18nService = i18nService;
        return `
        <h1>${this.i18nService.t('extra')}</h1>
        <div class="w3-bar" id="cardsContainer"></div>
        `;
    }
    afterRender(){
        this.getCards();
    }
    async getCards(){
        const fetchData = new FetchData('./assets/json/slides.json'); 
        fetchData.getData().then(data => {
            const painelLinha = document.createElement('div');
            painelLinha.className = "w3-cell-row";
            data.forEach(cardData => {
                const card = new Card(cardData,this.i18nService);
                painelLinha.appendChild(card.getElement()); 
            });
            document.getElementById('cardsContainer').appendChild(painelLinha);
        }); 
    }
}

export default Extra;
