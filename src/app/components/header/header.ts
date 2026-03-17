import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="container header-content">
        <div class="logo">DevFolio</div>
        <nav class="nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
        </nav>
        <div class="actions">
          <button class="btn btn-primary">Hire Me</button>
        </div>
      </div>
    </header>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      z-index: 1000;
      border-bottom: 1px solid var(--border-color);
      height: 70px;
      display: flex;
      align-items: center;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
    }
    .nav {
      display: flex;
      gap: 2rem;
      a {
        font-weight: 500;
        color: var(--text-muted);
        &:hover {
          color: var(--primary);
        }
      }
    }
    @media (max-width: 768px) {
      .nav { display: none; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {}
