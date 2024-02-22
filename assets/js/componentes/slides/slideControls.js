class SlideControls {
    constructor() {
        this.slideIndex = 0;
    }

    render() {
        return `
            <!-- Next and previous buttons -->
            <a class="prev">&#10094;</a>
            <a class="next">&#10095;</a>
            <div id="dotContainer" style="text-align:center">
                <span class="dot" data-slide="1"></span>
                <span class="dot" data-slide="2"></span>
                <span class="dot" data-slide="3"></span>
            </div>
        `;
    }

    afterRender() {
        const prev = document.querySelector(".prev");
        const next = document.querySelector(".next");

        prev.addEventListener("click", () => this.minuSlides(1));
        next.addEventListener("click", () => this.plusSlides(1));
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
