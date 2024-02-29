import SlideControls from './slideControls.js';
class SlideImages {
    constructor(images) {
        this.images = images
        this.slideControls = new SlideControls(images.length);
        this.intervalId = null;
    }
    render() {
        const slides = this.images.map((image, index) => `
            <div class="mySlides fade ">
                <div class="numbertext">${index + 1} / ${this.images.length}</div>
                <img src="${image}" style="width: 100%;max-height: 300px" alt="Painel de slides">
            </div>
        `).join('');
        const controls = this.slideControls.render();
        return `
            <div class="slideshow-container">
                ${controls}
                ${slides}
            </div>
        `;
    }
    afterRender() {
        const adjustDotsSize = () => {
            const slideshowContainer = document.querySelector('.slideshow-container');
            if (!slideshowContainer) return;
            const image = slideshowContainer.querySelector('img');
            if (!image) return;
        
            const adjustSize = () => {
                if (image.complete && image.naturalHeight !== 0) {
                    const containerWidth = image.offsetWidth;
                    const imagesCount = document.querySelectorAll('.mySlides').length;
                    const dotWidth = Math.max(3, containerWidth / imagesCount - 10); 
                    document.querySelectorAll('.dot').forEach(dot => {
                        dot.style.width = `${dotWidth}px`;
                    });
                }
            };
        
            if (image.complete && image.naturalHeight !== 0) {
                adjustSize();
            } else if (image) {
                image.onload = adjustSize;
            }
        };
    
        adjustDotsSize();
        window.addEventListener('resize', this.debounce(() => adjustDotsSize(), 100));
    
        this.slideControls.afterRender();
    }
    debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    clearInterval() {
        clearInterval(this.intervalId); 
    }
    destroy() {
        this.clearInterval(); 
    }
}

export default SlideImages;
