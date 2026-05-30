import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="about">

      <div class="container hero-layout">
        <div class="hero-content">
          <h1 class="headline">
            Building reliable <br />
            <span class="digital-text">web apps</span> with a focus on quality.
          </h1>

          <p class="description">
            I'm a <span class="highlight">Full-Stack Developer & QA Specialist</span> with over 3
            years of experience in <span class="highlight-angular">Angular</span> and
            <span class="highlight-firebase">Firebase</span>, building functional web applications
            and ensuring quality through rigorous testing.
          </p>

          <div class="cta-group">
            <a href="https://github.com/SalvucciFacundo" target="_blank" class="btn btn-outline cv-btn">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
                class="btn-icon-img invert-dark"
              />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/facundo-salvucci"
              target="_blank"
              class="btn btn-outline cv-btn"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                alt="LinkedIn"
                class="btn-icon-img"
              />
              LinkedIn
            </a>
            <a href="assets/facundo-salvucci_cv.pdf" target="_blank" class="btn btn-primary cv-btn">
              <span class="material-symbols-outlined">download</span>
              Get Resume
            </a>
          </div>
        </div>

        <div class="hero-visual">
          <div class="image-wrapper">
            <div class="profile-frame">
              <div class="profile-inner">
                <img src="assets/profile2.jpg" alt="Facundo Salvucci" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.scss',
})
export class HeroComponent {}
