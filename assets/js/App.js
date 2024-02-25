import rotas from './router.js';
import Navbar from '../js/componentes/navbar.js';
import Configuracoes from '../js/paginas/Configuracoes.js';
import I18nService from '../js/libs/I18nService.js';
import FloatingButton from '../js/componentes/floatingButton.js';
class App {
    constructor() {
        this.nav = document.getElementById("nav");
        this.conteudo = document.getElementById("app");
        this.componenteAtual = null;
        this.linguagem = new I18nService();
        this.init();
    }
    
    async init() {
        
        
        await this.linguagem.loadTranslations();
        this.configuracoes = new Configuracoes();
        this.configuracoes.applySettings();
        
        const floatingButton = new FloatingButton(this.linguagem, this.navegar.bind(this));
        floatingButton.render();
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
        this.nav.innerHTML = navbar.render(this.linguagem);
        navbar.fixNavbarOnMobile();
        navbar.afterRender();
        window.addEventListener('resize', () => navbar.fixNavbarOnMobile());
        if (this.componenteAtual && this.componenteAtual.destroy) {
            this.componenteAtual.destroy();
        }
    
        this.conteudo.innerHTML = '';
        this.conteudo.innerHTML = classeAtual.render(this.linguagem);
        this.componenteAtual = classeAtual;
        if (this.componenteAtual.afterRender) {
            await this.componenteAtual.afterRender();
        }
        this.atualizarMeta(rotas[rotaAtual].meta);
    }
    
}

const navegador = new App();

