import rotas from './router.js';
import Navbar from '../js/componentes/navbar.js';
class App {
    constructor() {
        this.nav = document.getElementById("nav");
        this.conteudo = document.getElementById("app");
        this.componenteAtual = null;
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
        const classeAtual = rotas[rotaAtual].component;
        const navbar = new Navbar();
        this.nav.innerHTML = navbar.render();
        navbar.fixNavbarOnMobile();
        window.addEventListener('resize', () => navbar.fixNavbarOnMobile());
        if (this.componenteAtual && this.componenteAtual.destroy) {
            this.componenteAtual.destroy();
        }
    
        this.conteudo.innerHTML = '';
        this.conteudo.innerHTML = classeAtual.render();
        this.componenteAtual = classeAtual;
        if (this.componenteAtual.afterRender) {
            await this.componenteAtual.afterRender();
        }
        this.atualizarMeta(rotas[rotaAtual].meta);
    }
    
}

const navegador = new App();

