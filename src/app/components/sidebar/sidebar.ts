import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar-dock">
      <button class="icon-btn theme-toggle" (click)="toggleTheme()" [title]="isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        <span class="material-symbols-outlined">
          {{ isDarkMode() ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>
      <div class="divider"></div>
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
    </aside>
  `,
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  constructor(private themeService: ThemeService) {}

  isDarkMode() {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
