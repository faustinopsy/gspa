class SlideControls {
    constructor(imagesCount) {
        this.slideIndex = 0;
        this.imagesCount = imagesCount;
    }
    render() {
        let dotsHtml = '';
        for (let i = 1; i <= this.imagesCount; i++) {
            dotsHtml += `<span class="dot" data-slide="${i}" ></span>`;
        }
        return `
        <div id="dotContainer" style="text-align:center">
                ${dotsHtml}
            </div>
        <a class="prev" aria-label="prev">&#10094;</a>
        <a class="next" aria-label="prev">&#10095;</a>
            
        `;
    }
    afterRender() {
        const prev = document.querySelector(".prev");
        const next = document.querySelector(".next");
        const dots = document.querySelectorAll(".dot");
        prev.addEventListener("click", () => this.minuSlides(1));
        next.addEventListener("click", () => this.plusSlides(1));
        dots.forEach(dot => {
            dot.addEventListener("click", () => this.currentSlide(parseInt(dot.getAttribute("data-slide"))));
        });
        this.showSlides();
        //this.intervalId = setInterval(() => this.plusSlides(1), 4000);
    }
    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    minuSlides(n) {
        this.showSlides(this.slideIndex -= n);
    }
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }
    showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        if (n === undefined) {
            n = ++this.slideIndex;
        }
        if (n > slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block";
        dots[this.slideIndex - 1].className += " active";
    } 
}

export default SlideControls;
