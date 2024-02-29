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
        
        const leftPanel = document.getElementById('left-panel');
        const rightPanel = document.getElementById('right-panel');
        const star = document.getElementById('star');
        const star2 = document.getElementById('star2');
        leftPanel.style.display = 'block';
        rightPanel.style.display = 'block';
    
        setTimeout(() => {
            leftPanel.style.transform = 'translateX(0)';
            rightPanel.style.transform = 'translateX(0)';
            star.style.transform = 'translate(-50%, -50%) scale(0.5)';
            star.style.display = 'block';
            star2.style.display = 'block';
        }, 100); 
        setTimeout(() => {
            leftPanel.style.transform = 'translateX(-100%)';
            rightPanel.style.transform = 'translateX(100%)';
            star.style.display = 'none';
            star2.style.display = 'none';
            setTimeout(() => {
                leftPanel.style.display = 'none';
                rightPanel.style.display = 'none';
            }, 500); 
        }, 2000); 
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
