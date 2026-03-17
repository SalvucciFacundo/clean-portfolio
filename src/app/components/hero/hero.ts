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
            Engineering robust <br>
            <span class="digital-text">digital</span> solutions.
          </h1>

          <p class="description">
            I'm a <span class="highlight">Full-Stack Developer & QA Specialist</span> focused on building scalable web applications with <span class="highlight-angular">Angular</span> and robust <span class="highlight-firebase">Firebase</span> architectures.
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
            <button class="btn btn-outline cv-btn">
              <span class="material-symbols-outlined">download</span>
              Get Resume
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="image-wrapper">
            <div class="badge badge-angular">
              <div class="badge-icon angular-bg">
                <span class="material-symbols-outlined">change_history</span>
              </div>
              <span>Angular 17+</span>
            </div>

            <div class="badge badge-firebase">
              <div class="badge-icon firebase-bg">
                <span class="material-symbols-outlined">local_fire_department</span>
              </div>
              <span>Firebase Core</span>
            </div>

            <div class="profile-frame">
              <div class="profile-inner">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEJ3tPxJPy-c1X2p_4xdWgD7Z1nomqrUigYLaeVex8EGfqoh26jtu4JK177kdExwsPPFbb5DREqAK2p4bGxYNTBw-5nSjm0vuxpQIBGH5-xn4hdu9JscHdko-2_LMwzMHSi1dXUZWSugvo6juG8WLxFsUtmXyD48sFLwvcQhJk223KEkPRpdBvPZPufY988VbrRvHHgBhPcl7TdiupOMfka2YRBsKiGG6mRkg3nZuPpXTtzY0-tAv8J9A7KIio4sApL0nHfIoriw" alt="Facundo Salvucci">
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
