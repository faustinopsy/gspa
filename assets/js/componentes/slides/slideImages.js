import SlideControls from './slideControls.js';
class SlideImages {
    constructor(images) {
        this.images = images
        this.slideControls = new SlideControls();
        this.intervalId = null;
    }
    render() {
        const slides = this.images.map((image, index) => `
            <div class="mySlides fade">
                <div class="numbertext">${index + 1} / ${this.images.length}</div>
                <img src="${image}" style="width:100%">
            </div>
        `).join('');
        const controls = this.slideControls.render();
        return `
            <div class="slideshow-container">
                ${slides}
                ${controls}
            </div>
        `;
    }

    afterRender() {
        this.slideControls.afterRender();
        const prev = document.querySelector(".prev");
        const next = document.querySelector(".next");
        const dots = document.querySelectorAll(".dot");
        prev.addEventListener("click", () => this.slideControls.minuSlides(1));
        next.addEventListener("click", () => this.slideControls.plusSlides(1));
        dots.forEach(dot => {
            dot.addEventListener("click", () => this.slideControls.currentSlide(parseInt(dot.getAttribute("data-slide"))));
        });
        this.slideControls.showSlides();
        this.intervalId = setInterval(() => this.slideControls.plusSlides(1), 4000);
    }
    clearInterval() {
        clearInterval(this.intervalId); 
    }

    destroy() {
        this.clearInterval(); 
       
    }
}

export default SlideImages;
