import Slides from '../componentes/slides.js';
import Card from '../componentes/card.js';
import FetchData from '../api/FetchData.js';
class Home {
    constructor() {
        this.slideIndex = 0;
        this.slides = new Slides()
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
                const card = new Card(cardData);
                document.getElementById('cardsContainer').appendChild(card.getElement());
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
