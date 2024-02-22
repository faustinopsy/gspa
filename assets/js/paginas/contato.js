import FormContato from '../componentes/formContato.js';
class Contato {
    constructor(){
        this.formulario = new FormContato();
    }
    render() {
        return this.formulario.render();
    }
    afterRender(){
        
    }
}

export default Contato;
