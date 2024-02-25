class FormContato {
    render(i18nService) {
        return `
        <div class="w3-container w3-panel w3-leftbar w3-card">
            <h2>${i18nService.t('contact_form')}</h2>
        <form class="w3-container">
            <label ><b>${i18nService.t('name')}</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text">
            <label ><b>${i18nService.t('subject')}</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text">
            <label ><b>${i18nService.t('message')}</b></label>
            <textarea class="w3-input w3-border w3-input" style="resize:none"></textarea> 
            <hr>
            <button class="w3-btn w3-blue-grey">${i18nService.t('send_button')}</button>
        </form>
        </div>
       
        `;
    }
}

export default FormContato;
