class Card {
    constructor(data) {
        this.data = data;
        this.contentVisible = false;
        this.cardElement = document.createElement('div');
        this.contentDiv = document.createElement('div');
        this.render();
    }
    render() {
        const { titulo, imagem, descricao, conteudo } = this.data;
        this.cardElement.classList.add('card');
        this.cardElement.innerHTML = `
            <img src="${imagem}" alt="${titulo}" style="width:40%">
            <div class="container">
                <h4><b>${titulo}</b></h4>
                <p>${descricao}</p>
                <button class="toggle-content-btn w3-btn w3-border w3-block">Mostrar Conteúdo</button>
            </div>
        `;
        this.contentDiv.classList.add('content');
        this.contentDiv.style.display = 'none';
        this.contentDiv.innerHTML = `<p>${conteudo}</p>`;
        this.cardElement.querySelector('.container').appendChild(this.contentDiv);
        this.cardElement.querySelector('.toggle-content-btn').addEventListener('click', () => this.toggleContent());
    }
    toggleContent() {
        this.contentVisible = !this.contentVisible;
        this.contentDiv.style.display = this.contentVisible ? 'block' : 'none';
    }
    getElement() {
        return this.cardElement;
    }
}

export default Card;