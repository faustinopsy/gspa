class Navbar {
    render() {
        return `
            <h1 id="titulo">Mini SPA</h1>
            <nav id="navbar" class="navbar" >
                <a href="#home" class="w3-bar-item w3-button">Home</a>
                <a href="#sobre" class="w3-bar-item w3-button">Sobre</a>
                <a href="#contato" class="w3-bar-item w3-button">Contato</a>
            </nav>
        `;
    }

    fixNavbarOnMobile() {
        const navbar = document.getElementById('nav');
        if (window.innerWidth <= 768) { 
            navbar.classList.add('fixed-bottom'); 
            navbar.classList.remove('fixed-top');
            document.getElementById('titulo').innerText=''
        } else {
            navbar.classList.remove('fixed-bottom'); 
            navbar.classList.add('fixed-top'); 
            document.getElementById('titulo').innerText='Mini SPA'
        }
    }
}

export default Navbar;
