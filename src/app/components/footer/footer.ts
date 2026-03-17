import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container footer-centered">
        <div class="footer-cta">
          <h4 class="links-title">Have a project?</h4>
          <p>Let's build something amazing together.</p>
          <a href="mailto:fds1288@gmail.com" class="btn btn-primary footer-btn">
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
      padding: 4rem 0 2rem;
    }

    .footer-centered {
      display: flex;
      justify-content: center;
      text-align: center;
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 3rem;
    }

    .links-title {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      color: white;
    }

    .footer-cta p {
      color: #94a3b8;
      margin-bottom: 2rem;
      font-size: 1.125rem;
    }

    .footer-btn {
      margin: 0 auto;
      padding: 1rem 2rem;
    }

    .footer-bottom {
      padding-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #64748b;
      font-size: 0.8125rem;

      @media (max-width: 640px) {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
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
