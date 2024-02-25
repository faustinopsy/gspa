import FormContato from '../componentes/formContato.js';
class Contato {
    constructor(){
        this.formulario = new FormContato();
        this.i18nService = null;
    }
    render(i18nService) {
        this.i18nService = i18nService;
        return `
        <h1>${this.i18nService.t('contact')}</h1>
        ${this.formulario.render(this.i18nService)}
         `
    }
    afterRender(){
        
    }
}

export default Contato;
