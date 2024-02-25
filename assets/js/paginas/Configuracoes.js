import LocalStorageService from '../libs/LocalStorageService.js';

class Configuracoes {
    constructor() {
        this.fontSize = LocalStorageService.getItem('fontSize') || 'medium';
        this.darkMode = LocalStorageService.getItem('darkMode') || false;
        this.language = LocalStorageService.getItem('language') || 'en';
        this.backgroundImage = LocalStorageService.getItem('backgroundImage') || '';
        this.i18nService = null;
    }

    applySettings() {
        if (this.backgroundImage) {
            document.body.style.backgroundImage = `url('${this.backgroundImage}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.getElementById('app').style.backgroundColor = 'transparent'; 
        } else {
            const initialBackgroundColor = LocalStorageService.getItem('backgroundColor') || '#FFFFFF';
            document.getElementById('app').style.backgroundColor = initialBackgroundColor;
        }
        let fontSizeValue;
        switch (this.fontSize) {
            case 'small':
                fontSizeValue = '12px';
                break;
            case 'medium':
                fontSizeValue = '16px';
                break;
            case 'large':
                fontSizeValue = '20px';
                break;
            default:
                fontSizeValue = '16px'; 
        }
        document.documentElement.style.setProperty('--p-font-size', fontSizeValue);
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    saveBackgroundImage(imagePath) {
        this.backgroundImage = imagePath;
        LocalStorageService.setItem('backgroundImage', imagePath);
        this.applySettings();
    }
    saveSettings() {
        LocalStorageService.setItem('fontSize', this.fontSize);
        LocalStorageService.setItem('darkMode', this.darkMode);
        LocalStorageService.setItem('language', this.language);
        this.applySettings();
        location.reload();
    }

    render(i18nService) {
        this.i18nService = i18nService;
       return `
        <h1>${this.i18nService.t('page_settings')}</h1>
        <div class="w3-container w3-panel w3-leftbar w3-card">
        <h2>${this.i18nService.t('settings_menu')}</h2>
            <div class="settings-container">
            <div class="setting-option">
                <p> ${this.i18nService.t('font_size')}</p>
                <div class="button-group" id="font-size">
                    <button class="btn ${this.fontSize === 'small' ? 'btn-active' : ''}" data-size="small">${this.i18nService.t('small')}</button>
                    <button class="btn ${this.fontSize === 'medium' ? 'btn-active' : ''}" data-size="medium">${this.i18nService.t('medium')}</button>
                    <button class="btn ${this.fontSize === 'large' ? 'btn-active' : ''}" data-size="large">${this.i18nService.t('large')}</button>
                </div>
            </div>
            <div class="setting-option">
                <p>${this.i18nService.t('dark_mode')}</p>
                <label class="switch">
                    <input type="checkbox" id="dark-mode" ${this.darkMode ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
            </div>
            <div>
            <label>${this.i18nService.t('backdrop_filter')}:</label>
            <input type="range" id="backdrop-filter-slider" min="0" max="30" value="10">
        </div>
        <div>
            <label>${this.i18nService.t('background_color')}:</label>
            <input type="color" id="background-color-picker">
        </div>
            <div class="setting-option">
                <p>${this.i18nService.t('language')}</p>
                <div class="button-group" id="language">
                    <button class="btn ${this.language === 'en' ? 'btn-active' : ''}" data-lang="en">${this.i18nService.t('english')}</button>
                    <button class="btn ${this.language === 'pt' ? 'btn-active' : ''}" data-lang="pt">${this.i18nService.t('portuguese')}</button>
                    <button class="btn ${this.language === 'es' ? 'btn-active' : ''}" data-lang="es">${this.i18nService.t('spanish')}</button>
                </div>
            </div>
        </div>
        <div>
        <div class="button-group" >
            <p for="background-image">${this.i18nService.t('choose_background_image')}</p>
            <input class="btn" type="file" id="background-image" accept="image/*">
            <button class="btn" id="apply-background">${this.i18nService.t('apply_background_button')}</button>
        </div>
        <hr>
        <div class="button-group" >
            <button id="save-settings" class="btn btn-active-2">${this.i18nService.t('save_settings_button')}</button>
            </div>
        </div>
       
        `;
    }

    afterRender() {
        document.getElementById('font-size').value = this.fontSize;
        document.getElementById('language').value = this.language;
        document.getElementById('dark-mode').checked = this.darkMode;

        document.getElementById('font-size').addEventListener('change', (e) => {
            this.fontSize = e.target.value;
        });

        document.getElementById('dark-mode').addEventListener('change', (e) => {
            this.darkMode = e.target.checked;
        });

        document.getElementById('language').addEventListener('change', (e) => {
            this.language = e.target.value;
        });

        document.getElementById('save-settings').addEventListener('click', () => {
            this.saveSettings();
        });
        document.getElementById('apply-background').addEventListener('click', () => {
            const fileInput = document.getElementById('background-image');
            const file = fileInput.files[0];
    
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
    
                reader.onload = (e) => {
                    const imagePath = e.target.result; 
                    this.saveBackgroundImage(imagePath);
                };
    
                reader.readAsDataURL(file);
            } else {
                alert('Por favor, selecione uma imagem válida.');
            }
        });
        document.querySelectorAll('#font-size .btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.fontSize = e.target.getAttribute('data-size');
                this.applySettings();
            });
        });
        
        document.querySelector('#dark-mode').addEventListener('change', (e) => {
            this.darkMode = e.target.checked;
            this.applySettings(); 
        });
        
        document.querySelectorAll('#language .btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.language = e.target.getAttribute('data-lang');
                this.applySettings();
            });
        });
        const backdropFilterSlider = document.getElementById('backdrop-filter-slider');
        const backgroundColorPicker = document.getElementById('background-color-picker');

        const initialBackdropFilter = LocalStorageService.getItem('backdropFilter') || 'blur(10px)';
        document.getElementById('app').style.backdropFilter = initialBackdropFilter;
        backdropFilterSlider.value = initialBackdropFilter.match(/\d+/)[0]; 

        const initialBackgroundColor = LocalStorageService.getItem('backgroundColor') || '#FFFFFF';
        document.getElementById('app').style.backgroundColor = initialBackgroundColor;
        backgroundColorPicker.value = initialBackgroundColor;

        backdropFilterSlider.addEventListener('input', () => {
            const filterValue = `blur(${backdropFilterSlider.value}px)`;
            document.getElementById('app').style.backdropFilter = filterValue;
            LocalStorageService.setItem('backdropFilter', filterValue);
        });

        backgroundColorPicker.addEventListener('input', () => {
            if (!this.backgroundImage) { 
                const colorValue = backgroundColorPicker.value;
                document.getElementById('app').style.backgroundColor = colorValue;
                LocalStorageService.setItem('backgroundColor', colorValue);
            }
        });
        
    }
    
}

export default Configuracoes;
