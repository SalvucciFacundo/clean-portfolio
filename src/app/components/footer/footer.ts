import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-cta-horizontal">
          <div class="cta-text">
            <h4 class="links-title">Have a project?</h4>
            <p>Let's build something amazing together.</p>
          </div>
          <div class="cta-action">
            <a href="mailto:fds1288@gmail.com" class="btn btn-primary footer-btn">
              Get in Touch
              <span class="material-symbols-outlined">mail</span>
            </a>
          </div>
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
      padding: 3rem 0 2rem;
    }

    .footer-cta-horizontal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 2rem;
      gap: 2rem;

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
      }
    }

    .cta-text {
      .links-title {
        font-size: 1.25rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        color: white;
      }

      p {
        color: #94a3b8;
        font-size: 1rem;
        margin: 0;
      }
    }

    .footer-btn {
      padding: 0.875rem 1.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #64748b;
      font-size: 0.8125rem;

      @media (max-width: 640px) {
        flex-direction: column;
        gap: 1.25rem;
        text-align: center;
      }
    }

    .bottom-links {
      display: flex;
      gap: 2rem;

      a {
        color: #64748b;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;

        &:hover {
          color: white;
        }
      }
    }
  `]
})
export class FooterComponent {}
