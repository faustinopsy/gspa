import rotas from './router.js'

function atualizarMeta(meta) {
    document.title = meta.title;
    document.querySelector('meta[name="description"]').content = meta.description;
}

function navegar(rota) {
    const component = rotas[rota].component;
    const conteudo = document.getElementById("main-content");
    conteudo.innerHTML = component();
    atualizarMeta(rotas[rota].meta);
}

window.addEventListener("hashchange", () => {
    const rota = location.hash;
    if (rotas.hasOwnProperty(rota)) {
        navegar(rota);
    } else {
        navegar("#home");
    }
});

navegar(location.hash);







