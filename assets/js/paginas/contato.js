import FormContato from '../componentes/formContato.js';
class Contato {
    constructor(){
        this.formulario = new FormContato();
        this.i18nService = null;
    }
    render(i18nService) {
        this.i18nService = i18nService;
        return `
        <div class="w3-cell-row">
            <div class="w3-container w3-cell w3-mobile">
                <h1>${this.i18nService.t('contact')}</h1>
                ${this.formulario.render(this.i18nService)}
            </div>
            <div class="w3-container  w3-cell w3-mobile">
                <h1>${this.i18nService.t('contact')}</h1>
                <div class="w3-card w3-center w3-leftbar">
                <img src="./assets/img/imagem2.webp" style="width:50%" alt="Alps">
                <div class="w3-container w3-center">
                <p>The Italian / Austrian Alps</p>
                </div>
            </div>
            </div>
        </div>      
         `
    }
    afterRender(){
        
    }
}

export default Contato;
