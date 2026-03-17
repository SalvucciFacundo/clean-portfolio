import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <div class="logo-icon">
            <span class="material-symbols-outlined">code</span>
          </div>
          <span class="logo-text">Dev<span>Folio</span></span>
        </div>
        
        <nav class="nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
        </nav>

        <div class="actions">
          <button class="btn btn-primary hire-btn">Hire Me</button>
          <button class="menu-btn">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(226, 232, 240, 0.5);
      padding: 1rem 0;
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      background: var(--primary);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 8px 16px -4px rgba(66, 182, 240, 0.3);
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-main);
      
      span {
        color: var(--primary);
      }
    }

    .nav {
      display: flex;
      gap: 2.5rem;
      
      @media (max-width: 768px) {
        display: none;
      }

      a {
        font-size: 0.875rem;
        font-weight: 600;
        color: #64748b;
        text-decoration: none;
        transition: var(--transition);

        &:hover {
          color: var(--primary);
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .hire-btn {
      @media (max-width: 640px) {
        display: none;
      }
    }

    .menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      
      @media (max-width: 768px) {
        display: block;
      }
    }
  `]
})
export class HeaderComponent {}
