import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <p>© 2024 DevFolio. Handcrafted with passion.</p>
        <div class="socials">
          <a href="#">Github</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      padding: 3rem 0;
      border-top: 1px solid var(--border-color);
      background-color: var(--bg-main);
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .socials {
      display: flex;
      gap: 1.5rem;
      a:hover {
        color: var(--primary);
      }
    }
    @media (max-width: 640px) {
      .footer-content { flex-direction: column; gap: 1.5rem; text-align: center; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {}
