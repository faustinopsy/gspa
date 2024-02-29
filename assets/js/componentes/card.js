import Modal from './Modal.js';
import Slide from './slides.js';
class Card {
    constructor(data,i18nService) {
        this.i18nService = i18nService;
        this.data = data;
        this.contentVisible = false;
        this.cardElement = document.createElement('div');
        this.contentDiv = document.createElement('div');
    }
    render() {
        const { titulo, imagem, descricao, conteudo, url } = this.data; 
        this.cardElement.classList.add('w3-card-4',"w3-panel","w3-leftbar", "w3-sand", "w3-third", "w3-center");
        this.cardElement.innerHTML = `
            <h2><b>${titulo}</b></h2>
            <img src="${imagem}" alt="${titulo}" style="width:300px; height:300px">
            <div class="container">
                <p>${descricao}</p>
                <button class="toggle-content-btn w3-btn w3-border w3-block" aria-label="${this.i18nService.t('details')}">${this.i18nService.t('details')}</button> 
            </div>
        `;
        this.contentDiv.classList.add('content');
        this.contentDiv.style.display = 'none';
        this.contentDiv.innerHTML = `
        <p>${conteudo}</p>
        <button class="open-url-btn w3-btn w3-border w3-block" aria-label="${this.i18nService.t('open')}">${this.i18nService.t('open')}</button>`;
        this.cardElement.querySelector('.container').appendChild(this.contentDiv);
    }
    afterRender() {
        const toggleBtn = this.cardElement.querySelector('.toggle-content-btn');
        const openUrlBtn = this.cardElement.querySelector('.open-url-btn');
        toggleBtn.addEventListener('click', () => this.toggleContent());
        openUrlBtn.addEventListener('click', () => this.openUrl());
    }
    toggleContent() {
        this.contentVisible = !this.contentVisible;
        this.contentDiv.style.display = this.contentVisible ? 'block' : 'none';
    }

    openUrl() {
        this.toggleContent();
        if (this.data.imagensRelacionadas && this.data.imagensRelacionadas.length > 0) {
            const slides = new Slide(this.data.imagensRelacionadas); 
            const modal = new Modal(() => slides.destroy());
            const modalContentHTML = slides.render();
            modal.setContent(modalContentHTML);
            slides.afterRender();
            modal.open();
        } else {
            const modalContentHTML = `
                <h2>${this.data.titulo}</h2>
                <img src="${this.data.imagem}" alt="${this.data.titulo}" style="width:200px; height:230px">
                <p>${this.data.descricao}</p>
                <p>${this.data.conteudo}</p>
            `;
            const modal = new Modal();
            modal.setContent(modalContentHTML);
            modal.open();
        }
    }
    
    getElement() {
        this.render();
        this.afterRender();
        return this.cardElement;
    }
    
}

export default Card;
