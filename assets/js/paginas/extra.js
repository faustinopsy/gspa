import Card from '../componentes/card.js';
import FetchData from '../api/FetchData.js';
class Extra {
    constructor() {}
    render() {
        return `
        <h2>Cards</h2>
        <div class="w3-bar" id="cardsContainer"></div>
        `;
    }
    afterRender(){
        this.getCards()
    }
    async getCards(){
        const fetchData = await new FetchData('./assets/json/postagens.json');
        fetchData.getData().then(data => {
            const painelLinha = document.createElement('div');
            painelLinha.className = "w3-cell-row";
            data.forEach(cardData => {
                const painelColuna = document.createElement('div');
                painelColuna.classList.add("w3-container","w3-red","w3-cell","w3-mobile","w3-center")
                const card = new Card(cardData);
                painelColuna.appendChild(card.getElement());
                painelLinha.appendChild(painelColuna);
            });
            document.getElementById('cardsContainer').appendChild(painelLinha);       
        });
    }
}

export default Extra;
