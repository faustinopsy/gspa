class FloatingButton {
    constructor(i18nService, navegar) {
        this.i18nService = i18nService;
        this.navegar = navegar;
        this.buttonElement = document.createElement('button');
        this.buttonElement.classList.add('floating-button');
        this.buttonElement.setAttribute('aria-label', this.i18nService.t('page_settings'));
    }
    render() {
        document.body.appendChild(this.buttonElement);
        this.buttonElement.addEventListener('click', () => this.navegar('#config'));
    }

}
export default FloatingButton;