class Modal {
    constructor(closeCallback = null) {
        this.closeCallback = closeCallback;
        this.modalElement = document.createElement('div');
        this.modalElement.classList.add('modalExtra');
        this.modalElement.innerHTML = `
            <div class="modalmodalExtra-content">
                <span class="closemodalExtra-btn">&times;</span>
                <div class="modalmodalExtra-body"></div>
            </div>
        `;
        this.body = this.modalElement.querySelector('.modalmodalExtra-body');
        this.closeBtn = this.modalElement.querySelector('.closemodalExtra-btn');
        this.closeBtn.onclick = () => this.close();
        document.body.appendChild(this.modalElement);
    }

    setContent(content) {
        if (typeof content === 'string') {
            this.body.innerHTML = '';
            this.body.innerHTML = content;
        } else if (typeof content === 'object') { 
            this.body.innerHTML = '';
            this.body.appendChild(content);
        }
    }

    open() {
        this.modalElement.style.display = 'block';
    }

    close() {
        this.modalElement.remove();
        this.modalElement = null;
        if (this.closeCallback) {
            this.closeCallback();
        }
    }
}
export default Modal;