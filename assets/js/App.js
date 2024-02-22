import rotas from './router.js';
import Navbar from '../js/componentes/navbar.js';

class App {
    constructor() {
        this.nav = document.getElementById("nav");
        this.conteudo = document.getElementById("app");
        this.componetCache = {};
        // ver como funciona hashchange 
        //https://developer.mozilla.org/pt-BR/docs/Web/API/Window/hashchange_event
        window.addEventListener("hashchange", () => this.navegar(location.hash));
        this.navegar(location.hash);
    }

    atualizarMeta(meta) {
        document.title = meta.title;
        document.querySelector('meta[name="description"]').content = meta.description;
    }

    async navegar(rota) {
        const rotaAtual = rota || '#home';
        const classInRouter = rotas[rotaAtual].component;
        const navbar = new Navbar();
        this.nav.innerHTML = navbar.render();
        this.conteudo.innerHTML = '';
        this.conteudo.innerHTML = classInRouter.render();
        if (classInRouter.afterRender) await classInRouter.afterRender();
        this.atualizarMeta(rotas[rotaAtual].meta);
    }
}

const navegador = new App();
