import Slides from '../componentes/slides.js';
class Home {
    constructor() {
        this.slideIndex = 0;
        this.slides = new Slides()
    }

    render() {
        return `
        <h2>Slides</h2>
        ${this.slides.render()}
        
        `;
    }
    afterRender(){
        this.slides.afterRender();
    }
    

}

export default Home;
