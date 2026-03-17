import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="about">
      <div class="blob-1"></div>
      <div class="blob-2"></div>

      <div class="container hero-layout">
        <div class="hero-content">
          <div class="availability">
            <span class="dot">
              <span class="ping"></span>
            </span>
            Available for new projects
          </div>

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

          <div class="qa-badges">
            <div class="qa-badge">
              <span class="material-symbols-outlined emoji">check_circle</span>
              <span>Manual Testing</span>
            </div>
            <div class="qa-badge">
              <span class="material-symbols-outlined emoji">settings_suggest</span>
              <span>Automated QA</span>
            </div>
            <div class="qa-badge">
              <span class="material-symbols-outlined emoji">bug_report</span>
              <span>End-to-End Testing</span>
            </div>
          </div>

          <div class="cta-group">
            <a href="#projects" class="btn btn-primary cta-btn">
              View My Work
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>
            <a href="assets/facundo-salvucci_cv.pdf" target="_blank" class="btn btn-outline cv-btn">
              <span class="material-symbols-outlined">download</span>
              Get Resume
            </a>
          </div>

          <div class="social-links">
            <a href="https://github.com/SalvucciFacundo" target="_blank" class="social-icon">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/facundo-salvucci"
              target="_blank"
              class="social-icon"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                alt="LinkedIn"
              />
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
