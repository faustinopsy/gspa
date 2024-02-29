import Slides from '../componentes/slides.js';
import Card from '../componentes/card.js';
import FetchData from '../api/FetchData.js';
class Home {
    constructor() {
        this.images = [
            "assets/img/img1.webp",
            "assets/img/img2.webp",
            "assets/img/img3.webp"
        ];
        this.slides = new Slides(this.images);
        this.i18nService = null;
    }
    render(i18nService) {
        this.i18nService = i18nService;
        return `
        <h1>${this.i18nService.t('home')}</h1>
        ${this.slides.render()}
        <div id="cardsContainer" class="cards-placeholder"></div>
        `;
    }
    afterRender(){
        this.slides.afterRender();
        this.getCards(this.i18nService)
    }
    async getCards(i18nService){
        const fetchData = new FetchData('./assets/json/postagens.json'); 
        fetchData.getData().then(data => {
            const painelLinha = document.createElement('div');
            painelLinha.className = "w3-cell-row";
            data.forEach(cardData => {
                const card = new Card(cardData,i18nService);
                painelLinha.appendChild(card.getElement()); 
            });
            document.getElementById('cardsContainer').appendChild(painelLinha);
        });
    }
    destroy() {
        if (this.slides.destroy) {
            this.slides.destroy();
        }
    }
}

export default Home;
