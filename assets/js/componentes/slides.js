import SlideImages from './slides/slideImages.js';

class Slide {
    constructor(images) {
        this.slideImages = new SlideImages(images);
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
