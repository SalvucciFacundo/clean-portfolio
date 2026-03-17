import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a href="#" class="logo">DevFolio<span class="dot">.</span></a>
          <p class="brand-text">
            Building high-performance web applications and ensuring software excellence through automated QA.
          </p>
          <div class="social-links">
            <a href="#" class="social-btn"><span class="material-symbols-outlined">alternate_email</span></a>
            <a href="#" class="social-btn"><span class="material-symbols-outlined">share</span></a>
          </div>
        </div>

        <div class="footer-links">
          <h4 class="links-title">Navigation</h4>
          <nav>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Work</a>
            <a href="#education">Path</a>
          </nav>
        </div>

        <div class="footer-cta">
          <h4 class="links-title">Have a project?</h4>
          <p>Let's build something amazing together.</p>
          <a href="mailto:hello@example.com" class="btn btn-primary footer-btn">
            Get in Touch
            <span class="material-symbols-outlined">mail</span>
          </a>
        </div>
      </div>
      
      <div class="container footer-bottom">
        <p>&copy; 2024 Facundo Salvucci. All rights reserved.</p>
        <div class="bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #0f172a;
      color: white;
      padding: 6rem 0 2rem;
    }

    .footer-grid {
      display: grid;
      grid-template-cols: 1.5fr 1fr 1.5fr;
      gap: 4rem;
      padding-bottom: 4rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      @media (max-width: 1024px) {
        grid-template-cols: 1fr 1fr;
      }

      @media (max-width: 640px) {
        grid-template-cols: 1fr;
        text-align: center;
      }
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 900;
      color: white;
      text-decoration: none;
      margin-bottom: 1.5rem;
      display: block;

      .dot {
        color: var(--primary);
      }
    }

    .brand-text {
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 2rem;
      max-width: 320px;
      
      @media (max-width: 640px) {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .social-links {
      display: flex;
      gap: 1rem;
      
      @media (max-width: 640px) {
        justify-content: center;
      }
    }

    .social-btn {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        background: var(--primary);
        transform: translateY(-3px);
      }
    }

    .links-title {
      font-size: 1.125rem;
      font-weight: 800;
      margin-bottom: 2rem;
      color: white;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      a {
        color: #94a3b8;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: white;
        }
      }
    }

    .footer-cta p {
      color: #94a3b8;
      margin-bottom: 2rem;
    }

    .footer-btn {
      width: fit-content;
      
      @media (max-width: 640px) {
        margin: 0 auto;
      }
    }

    .footer-bottom {
      padding-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #64748b;
      font-size: 0.875rem;

      @media (max-width: 640px) {
        flex-direction: column;
        gap: 1.5rem;
      }
    }

    .bottom-links {
      display: flex;
      gap: 2rem;

      a {
        color: #64748b;
        text-decoration: none;
        &:hover {
          color: white;
        }
      }
    }
  `]
})
export class FooterComponent {}
