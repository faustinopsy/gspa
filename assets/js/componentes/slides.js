class Slides {
    constructor() {
        this.slideIndex = 0;
    }

    render() {
        return `
        <div class="slideshow-container">
            <!-- Full-width images with number and caption text -->
            <div class="mySlides fade">
                <div class="numbertext">1 / 3</div>
                <img src="assets/img/img1.jpg" style="width:100%">
                <div class="text">Caption Text 1</div>
            </div>

            <div class="mySlides fade">
                <div class="numbertext">2 / 3</div>
                <img src="assets/img/img2.jpg" style="width:100%">
                <div class="text">Caption Text 2</div>
            </div>

            <div class="mySlides fade">
                <div class="numbertext">3 / 3</div>
                <img src="assets/img/img3.jpg" style="width:100%">
                <div class="text">Caption Text 3</div>
            </div>

            <!-- Next and previous buttons -->
            <a class="prev" >&#10094;</a>
            <a class="next" >&#10095;</a>
        </div>
        <br>

        <!-- The dots/circles -->
        <div id="dotContainer" style="text-align:center">
            <span class="dot" data-slide="1"></span>
            <span class="dot" data-slide="2"></span>
            <span class="dot" data-slide="3"></span>
        </div>
        `;
    }

    afterRender() {
        this.showSlides();
        setInterval(() => this.plusSlides(1), 4000); 

        const dots = document.getElementsByClassName("dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", () => this.currentSlide(parseInt(dots[i].getAttribute("data-slide"))));
        }
        const prev = document.getElementsByClassName("prev");
        prev[0].addEventListener("click", () => this.minuSlides(1));
        
        const next = document.getElementsByClassName("next");
        next[0].addEventListener("click", () => this.plusSlides(1));
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

export default Slides;
