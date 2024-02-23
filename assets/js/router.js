import Home from './paginas/home.js';
import Sobre from './paginas/sobre.js';
import Contato from './paginas/contato.js';
import Extra from './paginas/extra.js';
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
            "#extra": {
                component: new Extra(),
                meta: {
                    title: "Mini SPA - Extra",
                    description: "Página Extra do mini SPA",
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
