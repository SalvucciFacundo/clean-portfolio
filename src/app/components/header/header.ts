import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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
        
        <nav class="nav" [class.open]="isMenuOpen()">
          <a href="#about" (click)="closeMenu()">About</a>
          <a href="#skills" (click)="closeMenu()">Skills</a>
          <a href="#projects" (click)="closeMenu()">Projects</a>
          <a href="#experience" (click)="closeMenu()">Experience</a>
          <a href="#education" (click)="closeMenu()">Education</a>
          
          <!-- Mobile Theme Toggle & Socials inside the mobile menu -->
          <div class="mobile-menu-footer">
            <div class="divider"></div>
            <div class="mobile-actions">
              <button class="icon-btn theme-toggle" (click)="toggleTheme()" [title]="isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
                <span class="material-symbols-outlined">
                  {{ isDarkMode() ? 'light_mode' : 'dark_mode' }}
                </span>
                <span class="toggle-text">{{ isDarkMode() ? 'Light Mode' : 'Dark Mode' }}</span>
              </button>
              
              <div class="mobile-socials">
                <a href="https://github.com/SalvucciFacundo" target="_blank" class="icon-btn" title="GitHub">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                    alt="GitHub"
                    class="sidebar-icon-img invert-dark"
                  />
                </a>
                <a href="https://www.linkedin.com/in/facundo-salvucci" target="_blank" class="icon-btn" title="LinkedIn">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                    alt="LinkedIn"
                    class="sidebar-icon-img"
                  />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div class="actions">
          <a href="mailto:fds1288@gmail.com" class="btn btn-primary hire-btn">Hire Me</a>
          <button class="menu-btn" (click)="toggleMenu()">
            <span class="material-symbols-outlined">
              {{ isMenuOpen() ? 'close' : 'menu' }}
            </span>
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.scss',
})
export class HeaderComponent {
  isMenuOpen = signal(false);

  constructor(private themeService: ThemeService) {}

  isDarkMode() {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
