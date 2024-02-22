class Contato {
    render() {
        return `
        <h1>Página contato</h1>
        <div class="w3-container w3-teal">
            <h2>Input Form</h2>
        </div>
        <form class="w3-container">
            <label class="w3-text-teal"><b>Nome</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text">
            <label class="w3-text-teal"><b>Assunto</b></label>
            <input class="w3-input w3-border w3-light-grey" type="text">
            <button class="w3-btn w3-blue-grey">Enviar</button>
        </form>
        `;
    }
}

export default Contato;
