import Home from './home.js'
import Sobre from './sobre.js'
import Contato from './contato.js'

let rotas;
export default rotas = {
    "#home": {
        component: Home,
        meta: {
            title: "Mini SPA - Home",
            description: "Página inicial do mini SPA",
        },
    },
    "#sobre": {
        component: Sobre,
        meta: {
            title: "Mini SPA - Sobre",
            description: "Página sobre o mini SPA",
        },
    },
    "#contato": {
        component: Contato,
        meta: {
            title: "Mini SPA - Contato",
            description: "Página de contato do mini SPA",
        },
    },
};



