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
          <span class="logo-text">Facundo<span>Salvucci</span></span>
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
  styleUrl: './header.scss',
})
export class HeaderComponent {}
