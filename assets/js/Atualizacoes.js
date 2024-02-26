class Atualizacoes {
    constructor() {
        this.listenForHashChange();
        this.listenForSWMessages();
        this.createNotificationBox(); 
    }

    listenForHashChange() {
        window.addEventListener('hashchange', () => {
            if (location.hash === '#home' || location.hash === '#') {
                navigator.serviceWorker.controller.postMessage({
                    action: 'checkForUpdates'
                });
            }
        }, false);
    }

    listenForSWMessages() {
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data.type === 'UPDATE_AVAILABLE') {
                this.handleUpdateAvailable(event.data.ultimaModificacao);
            }
        });
    }

    handleUpdateAvailable(ultimaModificacao) {
        const ultimaDataSalva = localStorage.getItem('ultimaModificacao');
        if (!ultimaDataSalva || new Date(ultimaModificacao) > new Date(ultimaDataSalva)) {
            console.log('Nova atualização disponível!');
            localStorage.setItem('ultimaModificacao', ultimaModificacao);
            this.showNotification();
        }
    }

    createNotificationBox() {
        if (!document.getElementById('notificationBox')) {
            const notificationBox = document.createElement('div');
            notificationBox.id = 'notificationBox';
            notificationBox.className = 'notification-box hidden'; 
            notificationBox.innerHTML = `
            <p> ☄️🚀☄️ news!</p>
            <img src="./assets/img/notifica.webp" alt="Notifica" style="width:100px">
            `;

            document.body.appendChild(notificationBox); 
        }
    }

    showNotification() {
        const notificationBox = document.getElementById('notificationBox');
        if (!notificationBox) this.createNotificationBox(); 
        notificationBox.classList.remove('hidden');
        notificationBox.classList.add('show');
        
        setTimeout(() => {
            notificationBox.classList.remove('show');
            setTimeout(() => { 
                notificationBox.classList.add('hidden');
            }, 500);
        }, 10000); 
    }
}

if (document.readyState === 'loading') {  
    document.addEventListener('DOMContentLoaded', () => new Atualizacoes());
} else {  
    new Atualizacoes();
}
