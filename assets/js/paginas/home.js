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
        this.slides = new Slides(this.images)
    }
    render() {
        return `
        <h2>Slides</h2>
        ${this.slides.render()}
        <div id="cardsContainer"></div>
        `;
    }
    afterRender(){
        this.slides.afterRender();
        this.getCards()
    }
    async getCards(){
        const fetchData = await new FetchData('./assets/json/postagens.json');
        fetchData.getData().then(data => {
            data.forEach(cardData => {
                const cardPainel = document.createElement('div');
                cardPainel.classList.add("w3-card","w3-center")
                const card = new Card(cardData);
                cardPainel.appendChild(card.getElement());
                document.getElementById('cardsContainer').appendChild(cardPainel);
            });
        });
    }
    destroy() {
        if (this.slides.destroy) {
            this.slides.destroy();
        }
    }
}

export default Home;
