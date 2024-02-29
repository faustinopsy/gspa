import I18nService from '../js/libs/I18nService.js';
class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.setupButton = null;
        this.lido = false;
        this.linguagem = new I18nService();
    }

    initialize() {
        this.setupListeners();
        this.checkReadState();
        this.registerServiceWorker();
    }

    checkReadState() {
        this.lido = localStorage.getItem('lido');
        if (!this.lido) {
            this.mostrarModalNaoFechavel();
        }
    }

    mostrarModalNaoFechavel() {
        localStorage.setItem('lido', true);
        document.getElementById('left-panel').style.transform = 'translateX(-100%)';
        document.getElementById('right-panel').style.transform = 'translateX(100.03%)';
        document.getElementById('star2').style.transform = 'translate(-50%, -50%) scale(0.5)';
        document.getElementById('star').style.display = 'block';
        document.getElementById('star2').style.display = 'block';
        document.getElementById('left-panel').style.display = 'block';
        document.getElementById('right-panel').style.display = 'block';

        setTimeout(() => {
            document.getElementById('star').style.display = 'none';
            document.getElementById('star2').style.display = 'none';
            document.getElementById('left-panel').style.display = 'none';
            document.getElementById('right-panel').style.display = 'none';
        }, 3000); 
    }

    async setupListeners() {
        await this.linguagem.loadTranslations();
        window.addEventListener('DOMContentLoaded', () => {
            this.checkReadState();
        });

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;

            const installModal = document.createElement('div');
            installModal.setAttribute('id', 'installModal');
            installModal.style.zIndex = '9999';
            installModal.style.top = '100px';
            installModal.innerHTML = `
                <div class="w3-panel w3-pale-green">
                    <h2>${this.linguagem.t('install_app')}</h2>
                    <button id="installBtn" class="w3-button w3-white  ">📱 ${this.linguagem.t('install')}</button>
                    <button id="cancelInstallBtn" class="w3-button w3-white  ">❌ ${this.linguagem.t('cancel')}</button>
                    <p>${this.linguagem.t('install_prompt')}</p>
                </div>
            `;
            document.body.appendChild(installModal);

            installModal.style.display = 'block';
            document.getElementById('installBtn').addEventListener('click', () => {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('Usuário aceitou a instalação do PWA');
                    } else {
                        console.log('Usuário recusou a instalação do PWA');
                    }
                    this.deferredPrompt = null;
                    installModal.style.display = 'none';
                });
            });

            document.getElementById('cancelInstallBtn').addEventListener('click', () => {
                installModal.style.display = 'none';
            });
        });

        window.addEventListener('appinstalled', (evt) => {
            console.log("appinstalled fired", evt);
        });
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./sw.js')
                .then(serviceWorker => {
                    console.log('Rodando serviço: ' + serviceWorker);
                })
                .catch(error => {
                    console.log('Error registering the Service Worker: ' + error);
                });
        }
    }
}

const pwaInstaller = new PWAInstaller();
window.addEventListener('load', () => {
    pwaInstaller.initialize();
});
