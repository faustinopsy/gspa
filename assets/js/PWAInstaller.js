class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.setupButton = null;
        this.lido = false;
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
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.backdropFilter = 'blur(15px)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '10000';

        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '5px';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fechar';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.background = 'red';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';

        closeButton.onclick = function () {
            document.body.removeChild(modal);
        };

        modalContent.innerHTML += `
            <h2>🚀 Seja bem vindo!</h2>
            <p>Olá, esse app é um modelo SPA.</p>
            <p> Este é um modelo para ser expandido, como forma de estudo!</p>
            <p>Espero que goste, feito por um professor para alunos.</p> 
        `;

        modal.appendChild(modalContent);
        modalContent.appendChild(closeButton);
        document.body.appendChild(modal);
    }

    setupListeners() {
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
                    <h2>Instalar Aplicativo</h2>
                    <p>Quer instalar para uma experiência completa?</p>
                    <button id="installBtn" class="w3-button w3-white w3-border w3-border-blue w3-round">📱 Instalar</button>
                    <button id="cancelInstallBtn" class="w3-button w3-white w3-border w3-border-red w3-round">❌ Cancelar</button>
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
