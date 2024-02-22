import Home from './home.js';
import Sobre from './sobre.js';
import Contato from './contato.js';

class Rotas {
    constructor() {
        this.rotas = {
            "#home": {
                component: new Home(),
                meta: {
                    title: "Mini SPA - Home",
                    description: "Página inicial do mini SPA",
                },
            },
            "#sobre": {
                component: new Sobre(),
                meta: {
                    title: "Mini SPA - Sobre",
                    description: "Página sobre o mini SPA",
                },
            },
            "#contato": {
                component: new Contato(),
                meta: {
                    title: "Mini SPA - Contato",
                    description: "Página de contato do mini SPA",
                },
            },
        };
    }

    getRotas() {
        return this.rotas;
    }
}

const rotas = new Rotas();

export default rotas.getRotas();
