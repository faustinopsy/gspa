class FloatingButton {
    constructor(i18nService, navegar) {
        this.i18nService = i18nService;
        this.navegar = navegar;
        this.buttonElement = document.createElement('button');
        //this.buttonElement.textContent = this.i18nService.t('open');
        this.buttonElement.classList.add('floating-button');
    }

    render() {
        document.body.appendChild(this.buttonElement);
        this.buttonElement.addEventListener('click', () => this.navegar('#config'));
    }

}
export default FloatingButton;