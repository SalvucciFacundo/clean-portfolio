import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="about">
      <div class="blob-1"></div>
      <div class="blob-2"></div>
      
      <div class="container hero-container">
        <div class="hero-content">
          <div class="availability">
            <span class="dot">
              <span class="ping"></span>
            </span>
            Available for new projects
          </div>

          <h1 class="headline">
            Engineering robust <br>
            <span class="digital-text italic">digital</span> solutions.
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
  styles: [`
    .hero {
      position: relative;
      overflow: hidden;
      padding: 8rem 0;
      background-color: var(--bg-light);
    }

    .blob-1, .blob-2 {
      position: absolute;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      filter: blur(80px);
      z-index: 0;
    }

    .blob-1 {
      top: -100px;
      right: -100px;
      background: rgba(221, 0, 49, 0.05);
    }

    .blob-2 {
      bottom: -100px;
      left: -100px;
      background: rgba(255, 202, 40, 0.1);
    }

    .hero-container {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-cols: 1.2fr 1fr;
      align-items: center;
      gap: 4rem;

      @media (max-width: 1024px) {
        grid-template-cols: 1fr;
        text-align: center;
        gap: 6rem;
      }
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      
      @media (max-width: 1024px) {
        align-items: center;
      }
    }

    .availability {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(66, 182, 240, 0.1);
      color: var(--primary);
      padding: 0.5rem 1rem;
      border-radius: 100px;
      font-size: 0.875rem;
      font-weight: 700;
      width: fit-content;
    }

    .dot {
      position: relative;
      width: 8px;
      height: 8px;
      background: var(--primary);
      border-radius: 50%;
    }

    .ping {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--primary);
      border-radius: 50%;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      75%, 100% { transform: scale(2.5); opacity: 0; }
    }

    .headline {
      font-size: 4.5rem;
      font-weight: 900;
      color: var(--text-main);
      line-height: 1.1;

      @media (max-width: 640px) {
        font-size: 3rem;
      }
    }

    .digital-text {
      color: var(--angular);
    }

    .description {
      font-size: 1.25rem;
      color: var(--text-muted);
      max-width: 540px;
      line-height: 1.6;

      .highlight {
        color: var(--text-main);
        font-weight: 700;
      }

      .highlight-angular {
        color: var(--angular);
        font-weight: 800;
      }

      .highlight-firebase {
        color: var(--firebase);
        font-weight: 800;
      }
    }

    .qa-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      
      @media (max-width: 1024px) {
        justify-content: center;
      }
    }

    .qa-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 100px;
      font-size: 0.875rem;
      font-weight: 700;

      .emoji {
        color: var(--angular);
        font-size: 1rem;
      }
    }

    .cta-group {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding-top: 1rem;
      
      @media (max-width: 1024px) {
        justify-content: center;
      }
    }

    .cta-btn {
      padding: 1.25rem 2.5rem;
      font-size: 1.125rem;
    }

    .cv-btn {
      padding: 1.25rem 2.5rem;
      font-size: 1.125rem;
    }

    .hero-visual {
      display: flex;
      justify-content: center;
    }

    .image-wrapper {
      position: relative;
      width: 450px;
      height: 450px;
      
      @media (max-width: 640px) {
        width: 300px;
        height: 300px;
      }
    }

    .badge {
      position: absolute;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      font-weight: 700;
      font-size: 0.875rem;
    }

    .badge-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .material-symbols-outlined {
        font-size: 1.25rem;
      }
    }

    .angular-bg { background: #fef2f2; color: #ef4444; }
    .firebase-bg { background: #fffbeb; color: #f59e0b; }

    .badge-angular {
      top: 10%;
      left: -50px;
      animation: float 4s ease-in-out infinite;
      
      @media (max-width: 640px) {
        left: -20px;
      }
    }

    .badge-firebase {
      bottom: 20%;
      right: -30px;
      animation: float 4s ease-in-out infinite 2s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    .profile-frame {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--angular), var(--firebase));
      padding: 8px;
      border-radius: 4rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .profile-inner {
      width: 100%;
      height: 100%;
      background: var(--bg-light);
      border-radius: 3.5rem;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(1);
        transition: filter 0.5s ease;
        
        &:hover {
          filter: grayscale(0);
        }
      }
    }
  `]
})
export class HeroComponent {}
