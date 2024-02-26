class Sobre {
    constructor(){
        this.i18nService = null;
    }
    render(i18nService) {
        this.i18nService = i18nService;
        return `
        <h1>${this.i18nService.t('about')}</h1>
        <section class="hero">
        <div class="hero-content">
          <h1>John Doe</h1>
          <p>Developer | Designer | Creator</p>
          <button class="cta">Download Resume</button>
        </div>
      </section>
      
      <!-- About Section -->
      <section class="about">
        <div class="about-content">
          <h2>About Me</h2>
          <p>This is a section about my professional background, skills, and accomplishments.</p>
        </div>
      </section>
      
      <!-- Portfolio Section -->
      <section class="portfolio">
        <div class="portfolio-content">
          <h2>My Work</h2>
          <p>Here's a look at some of my recent projects.</p>
        </div>
      </section>
        `;
    }
    
}
export default Sobre;
