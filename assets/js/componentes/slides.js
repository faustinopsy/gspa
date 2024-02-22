import SlideImages from './slides/slideImages.js';

class Slide {
    constructor() {
        this.slideImages = new SlideImages();
    }

    render() {
        return this.slideImages.render();
    }
    afterRender(){
        this.slideImages.afterRender();
    }
    destroy() {
        if (this.slideImages.destroy) {
            this.slideImages.destroy();
        }
    }
}

export default Slide;
