class Navbar {
    constructor() {
        this.navOpen = false;
    }
    render(i18nService) {
        this.i18nService = i18nService;
        return `
            <h1 id="titulo">${this.i18nService.t('mini_spa')}</h1>
            <nav id="navbar" class="navbar" >
                <a href="#home" class="w3-bar-item w3-button">${this.i18nService.t('home')}</a>
                <a href="#sobre" class="w3-bar-item w3-button">${this.i18nService.t('about')}</a>
                <a href="#contato" class="w3-bar-item w3-button">${this.i18nService.t('contact')}</a>
                <a href="#extra" class="w3-bar-item w3-button">${this.i18nService.t('extra')}</a>
            </nav>
            <div id="mobibar" class="overlay">
                <div class="overlay-content">
                    <a href="#" id="homeLink">${this.i18nService.t('home')}</a>
                    <a href="#sobre" id="aboutLink">${this.i18nService.t('about')}</a>
                    <a href="#contato" id="contactLink">${this.i18nService.t('contact')}</a>
                    <a href="#extra" >${this.i18nService.t('extra')}</a>
                    </div>
            </div>
            <div class="w3-bottom w3-black" style="z-index:99;">
                <button class="w3-bar w3-xlarge w3-black w3-display-bottommiddle" id="hamburg" style="cursor: pointer;">☰</button>
            </div>
        `;
    }
    fixNavbarOnMobile() {
        
        const navbar = document.getElementById('nav');
        const titulo = document.getElementById('titulo');
        const hamburg = document.getElementById("hamburg");
        const isMobile = window.innerWidth <= 768;
        navbar.classList.toggle('fixed-bottom', isMobile);
        navbar.classList.toggle('fixed-top', !isMobile);
        titulo.innerText = isMobile ? '' : 'Mini SPA';
        hamburg.style.display = isMobile ? 'block' : 'none';
        document.querySelector('main').style.marginTop = isMobile ? '0' :'95px' ;
        if (this.navOpen && isMobile) {
            this.applyNavOpenStyles();
        } else {
            this.applyNavCloseStyles();
        }
    }
    applyNavOpenStyles() {
        document.getElementById('mobibar').classList.add('heightnav');
        document.getElementById('nav').classList.add('heightnav');
        document.getElementById('navbar').style.display = 'none';
        document.getElementById("hamburg").innerText = "X";
    }
    applyNavCloseStyles() {
        document.getElementById('nav').classList.remove('heightnav');
        document.getElementById('mobibar').classList.remove('heightnav');
        document.getElementById('navbar').style.display = 'block';
        document.getElementById("hamburg").innerText = "☰";
    }
    toggleNav() {
        this.navOpen = !this.navOpen;
        if (this.navOpen) {
            this.applyNavOpenStyles();
        } else {
            this.applyNavCloseStyles();
            this.fixNavbarOnMobile(); 
        }
    }
    afterRender() {
        document.getElementById("hamburg").addEventListener('click', () => this.toggleNav());
        ["homeLink", "aboutLink", "contactLink"].forEach(id => {
            document.getElementById(id).addEventListener('click', () => this.toggleNav());
        });
    }
}

export default Navbar;
